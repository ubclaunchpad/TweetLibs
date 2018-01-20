import React from 'react';
import SingleInput from './SingleInput';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: props.labels
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
  }

  render() {
    var inputs = this.state.labels.map(function (label, i) {
      return (
        <SingleInput label={ label }> </SingleInput>
        );
    });
    return (
      <form onSubmit={this.handleSubmit}>
        { inputs }
        <button>Submit</button>
      </form>
    );
  }
}

export default MyForm; 