import React from 'react';
import * as BS from 'react-bootstrap';

export function FormControlTextCareful({ value, onChange }) {
  const safeValue = value == null ? '' : value;
  return <BS.FormControl type="text" value={safeValue} onChange={onChange} />;
}

export function FormControlTextArea({ id, value, onChange }) {
  return (
    <BS.FormControl
      componentClass="textarea"
      id={id}
      value={value}
      onChange={onChange}
    />
  );
}

export function FormControlSelect({ onChange, children, id, value }) {
  return (
    <BS.FormControl
      componentClass="select"
      id={id}
      value={value}
      onChange={onChange}
    >
      {children}
    </BS.FormControl>
  );
}