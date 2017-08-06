import React, { Component } from 'react';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectFiles from '../components/SelectFiles';
import { CompareFile } from '../library/file-compare';

class FileCompareSteps extends React.Component {

  constructor() {
    super();
    this.state = {
      finished: false,
      stepIndex: 0,
      files: {
        file1: [{
          address: "...",
          isModified: false
        }],
        file2: [{
          address: "...",
          isModified: false
        }]
      }
    }
  }

  handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };
  
  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<SelectFiles changeFile={this.changefile} files={this.state.files} />);
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  };

  changefile = (fileName, fileObj) => {
    this.setState((prevState, props) => {
      prevState.files[fileName] = fileObj;
      return Object.assign({}, prevState);
    }); 
  };

  compareFile = (file1, file2) => {
    CompareFile(file1[0].address , file2[0].address).then((result) =>  {
      console.log(result);
    }).catch(console.error)
  }

  render() {
    const contentStyle = { margin: '0 16px' };
    return (
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
            <Stepper activeStep={this.state.stepIndex}>
                <Step>
                    <StepLabel>Select Files</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Processing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Results</StepLabel>
                </Step>
            </Stepper>
            <div style={contentStyle}>
                {this.state.finished ? (
                    <p>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({ stepIndex: 0, finished: false });
                            }}
                        >
                            Click here
              </a> to reset the example.
            </p>
                ) : (
                        <div>
                            <div>{this.getStepContent(this.state.stepIndex)}</div>
                            <div style={{ marginTop: 12 }}>
                                <FlatButton
                                    label="Back"
                                    disabled={this.state.stepIndex === 0}
                                    onTouchTap={() => { this.handlePrev() }}
                                    style={{ marginRight: 12 }}
                                />
                                <RaisedButton
                                    label={this.state.stepIndex === 2 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onTouchTap={() => { 
                                      const result = this.compareFile(this.state.files.file1, this.state.files.file2);
                                      this.handleNext();
                                      }}
                                />
                            </div>
                        </div>
                    )}
            </div>
      </div>
    );
  }
}

export default FileCompareSteps;
