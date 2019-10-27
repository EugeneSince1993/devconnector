import React, { Fragment } from 'react';
import spinner from './spinner.gif';

/* This is just gonna load the spinner graphical item. */
export default () => (
  <Fragment>
    <img 
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);