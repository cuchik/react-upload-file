import React from 'react';

import BaseButton from './Base';

const Button = props => {
  const { children, buttonProps } = props;
  return <BaseButton {...buttonProps}>{children}</BaseButton>;
};

export default Button;
