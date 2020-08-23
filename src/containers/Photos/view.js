/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import clsx from 'clsx';
import findIndex from 'lodash/findIndex';
import { Divider } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import { DropzoneArea } from 'material-ui-dropzone';
import Checkbox from '@material-ui/core/Checkbox';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from 'components/Button';
import ActivityStatus from 'common/enum/activity';

import classes from './Photos.module.scss';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      files: [],
      numberPerPage: 25,
      skipNumber: 0,
      album: '',
      isDeleteMode: false,
      deleteObjs: [],
      isDeleteModal: false,
    };
  }

  componentDidMount() {
    const { getPhotos } = this.props;
    getPhotos({
      skip: 0,
      limit: 25,
    });
  }

  handleClickOpen = () => {
    this.setState({
      openModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      openModal: false,
    });
  };

  handleChange = files => {
    this.setState({
      files,
    });
  };

  handleUploadPhotos = () => {
    const { uploadPhotos, getPhotos } = this.props;
    const { album, files, numberPerPage } = this.state;
    const formData = new FormData();
    formData.append('album', album);
    files.map(f => {
      formData.append('documents', f);
      return true;
    });
    uploadPhotos(formData, () => {
      getPhotos({
        skip: 0,
        limit: numberPerPage,
      });
      this.setState({
        album: '',
        files: [],
        skipNumber: 0,
      });
      this.handleClose();
    });
  };

  handleCheck = (name, album) => {
    const { isDeleteMode, deleteObjs } = this.state;
    if (isDeleteMode) {
      const newDeleteObjs = [...deleteObjs];
      if (findIndex(newDeleteObjs, { documents: name, album }) < 0) {
        newDeleteObjs.push({
          documents: name,
          album,
        });
        this.setState({
          deleteObjs: newDeleteObjs,
        });
      } else {
        this.setState({
          deleteObjs: newDeleteObjs.filter(
            n => n.documents !== name && n.album !== album,
          ),
        });
      }
    }
  };

  handleDeletePhotos = () => {
    this.setState({
      isDeleteModal: true,
    });
  };

  handleCloseEditModal = () => {
    this.setState({
      isDeleteModal: false,
    });
  };

  handleDeletedPhotos = () => {
    const { deletePhotos } = this.props;
    const { deleteObjs } = this.state;
    deletePhotos(deleteObjs, () => {
      this.setState({
        deleteObjs: [],
        isDeleteModal: false,
        isDeleteMode: false,
      });
    });
  };

  render() {
    const {
      photos,
      getPhotos,
      hasMore,
      photosLoading,
      uploadPhotosLoading,
      deletePhotosLoading,
    } = this.props;
    const {
      openModal,
      files,
      numberPerPage,
      skipNumber,
      album,
      isDeleteMode,
      deleteObjs,
      isDeleteModal,
    } = this.state;
    const deleteObjsLength = deleteObjs.length;

    return (
      <div>
        <Backdrop
          className={classes.backdrop}
          open={[
            uploadPhotosLoading,
            photosLoading,
            deletePhotosLoading,
          ].includes(ActivityStatus.Loading)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className={classes.heading}>
          <h2>Photos</h2>
          <div
            className={clsx(classes.actions, {
              [classes.isEditMode]: isDeleteMode,
            })}
          >
            <Button
              buttonProps={{
                onClick: () => {
                  if (isDeleteMode) {
                    if (deleteObjsLength > 0) {
                      this.handleDeletePhotos();
                    } else {
                      this.setState({
                        isDeleteMode: false,
                      });
                    }
                  } else {
                    this.setState({
                      isDeleteMode: true,
                    });
                  }
                },
              }}
            >
              <DeleteIcon /> Delete{' '}
              {isDeleteMode &&
                ` ${deleteObjsLength} photo${deleteObjsLength > 1 ? 's' : ''}`}
            </Button>
            <Button
              buttonProps={{
                onClick: () => {
                  this.handleClickOpen();
                  this.setState({
                    album: '',
                  });
                },
              }}
            >
              <CloudUploadIcon />
              Upload
            </Button>
            <Select
              native
              value={numberPerPage}
              onChange={e => {
                const value = parseInt(e.target.value, 10);
                this.setState({
                  numberPerPage: value,
                  skipNumber: 0,
                });
                getPhotos({
                  skip: 0,
                  limit: value,
                });
              }}
              className={classes.select}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Select>
          </div>
        </div>
        <div
          className={clsx(classes.content, {
            [classes.isDeleteMode]: isDeleteMode,
          })}
        >
          <ul>
            {photos.map(p => {
              return (
                <li
                  key={p.id}
                  onClick={() => {
                    this.handleCheck(p.name, p.album);
                  }}
                >
                  <img src={p.raw} alt="img" />
                  {isDeleteMode && (
                    <Checkbox
                      checked={
                        findIndex(deleteObjs, {
                          documents: p.name,
                          album: p.album,
                        }) >= 0
                      }
                      className={classes.checkbox}
                      onChange={() => {
                        this.handleCheck(p.name, p.album);
                      }}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  )}

                  <span className={classes.caption}>
                    <b>{p.name}</b>
                    {p.album}
                  </span>
                </li>
              );
            })}
          </ul>
          {hasMore && (
            <Button
              buttonProps={{
                onClick: () => {
                  const newSkipNumber = skipNumber + numberPerPage;
                  this.setState({
                    skipNumber: newSkipNumber,
                  });
                  getPhotos(
                    {
                      skip: newSkipNumber,
                      limit: numberPerPage,
                    },
                    true,
                  );
                },
              }}
            >
              Load More
            </Button>
          )}
        </div>
        <Dialog
          onClose={this.handleClose}
          open={openModal}
          classes={{
            paper: classes.modal,
          }}
        >
          <div className={classes.modalTitle}>
            <h3>Upload photos</h3>
            <CloseIcon onClick={this.handleClose} />
          </div>
          <div className={classes.modalContent}>
            <DropzoneArea
              onChange={this.handleChange}
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              maxFileSize={5000000}
              filesLimit={100}
            />
          </div>
          <div className={classes.modalFooter}>
            <Select
              native
              value={album}
              onChange={e => {
                this.setState({
                  album: e.target.value,
                });
              }}
              className={classes.selectAlbum}
            >
              <option value="">Select album</option>
              <option value="Travel">Travel</option>
              <option value="Personal">Personal</option>
              <option value="Food">Food</option>
              <option value="Nature">Nature</option>
              <option value="Other">Other</option>
            </Select>
            <Button
              buttonProps={{
                className: classes.uploadButton,
                disabled: files.length === 0 || !album,
                onClick: this.handleUploadPhotos,
              }}
            >
              Upload
            </Button>
          </div>
        </Dialog>
        <Dialog
          onClose={this.handleCloseEditModal}
          open={isDeleteModal}
          classes={{
            paper: classes.modal,
          }}
        >
          <div className={classes.modalTitle}>
            <h3>Delete photos</h3>
            <CloseIcon onClick={this.handleCloseEditModal} />
          </div>
          <div className={classes.modalContent}>
            Are you sure you want to delete these photos?
          </div>
          <div
            className={clsx(classes.modalFooter, classes.deleteModalButtons)}
          >
            <Button
              buttonProps={{
                onClick: () => {
                  this.handleCloseEditModal();
                  this.setState({
                    isDeleteMode: false,
                    deleteObjs: [],
                  });
                },
              }}
            >
              Cancel
            </Button>
            <Button
              buttonProps={{
                color: 'default',
                onClick: this.handleDeletedPhotos,
              }}
            >
              Delete
            </Button>
          </div>
        </Dialog>
        <Divider />
      </div>
    );
  }
}

export default Photos;
