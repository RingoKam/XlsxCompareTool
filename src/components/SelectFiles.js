const electron = window.require('electron').remote;

import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

const SelectFile = (fileName, file, changeFile) => {

  const onChangeFile = () => {
    electron.dialog.showOpenDialog({
      title: "Select file",
    }, (filePath) => {
      file[0].address = filePath[0];
      file[0].isModified = true;
      changeFile(fileName, file);
    });
  }

  return(
    <Paper zDepth={1}>
      <h2>{file[0].address}</h2>     
      <RaisedButton primary onTouchTap={onChangeFile}>SelectFile</RaisedButton>
    </Paper>
  )
}

export default (props) => {
    return (
      <div>
        {SelectFile("file1", props.files.file1, props.changeFile)}
        {SelectFile("file2", props.files.file2, props.changeFile)}
      </div>
  );
};
