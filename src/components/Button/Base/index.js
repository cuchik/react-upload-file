import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

const BaseButton = props => {
  const {
    children,
    className,
    variant = 'contained',
    color = 'primary',
    ...other
  } = props;
  return (
    <Wrapper className={className}>
      <Button variant={variant} color={color} {...other}>
        {children}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-width: 150px;
  position: relative;
  display: inline-block;
  button {
    width: 100%;
  }
`;

export default BaseButton;
