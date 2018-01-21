import React from 'react';
import SingleInput from './SingleInput';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      labels: props.labels,
      handleSubmit: props.onSubmit
    }
  }

  render() {
    var inputs = this.state.labels.map(function (label, i) {
      return (
        <SingleInput label={ label }> </SingleInput>
        );
    });
    return (
      <form onSubmit={ this.state.handleSubmit }>
        { inputs }
        <button>Submit</button>
      </form>
    );
  }
}

export default MyForm; 