import React, { Component } from 'react';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Alert
} from 'react-bootstrap';
import request from 'superagent';

class EditBucketlistForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editBucketlist = this.editBucketlist.bind(this);
    this.state = {
      name: this.props.name,
      description: this.props.description
    };
  }

  handleSubmit(event) {
    this.editBucketlist(this.state.name, this.state.description);
  }

  editBucketlist(name, description) {
    console.log(this);
    let params = this.props;
    request
      .put(`/api/v1/bucketlists/${params.bucketlist_id}/`)
      .set('Authorization', 'JWT '+ sessionStorage.accessToken)
      .send({'name': name, 'description': description})
      .end((err, result) => {
        if(err || !result.ok){
          let errorMessage = 'Error occured';
          if(result.body.name){
            errorMessage = result.body.name[0];
          } else if(result.body[0]) {
              errorMessage = result.body[0];
          }
          this.setState({
            message: errorMessage,
            messageType: 'danger'
          });
        } else {
            this.setState({
              message: 'Bucketlist details successfully edited',
              messageType: 'success'
            });
            window.location.href = `/onebucketlist/${params.bucketlist_id}/`
        }
      });
  }

  render() {
    return  (
      <Form onSubmit={this.handleSubmit}>
        {this.state.message ?
          <Alert bsStyle={this.state.messageType}>
           {this.state.message}
          </Alert> : null
        }
        <FormGroup >
          <FormControl.Feedback>
          </FormControl.Feedback>
          <FormControl type="text"
                       placeholder="Name"
                       name="name"
                       value={this.state.name}
                       onChange={function (event) {
                             let key = event.target.name;
                             let value = event.target.value;
                             this.setState({
                               [key]: value
                             });
                             }.bind(this)
                            }
          />
        </FormGroup>
        <FormGroup >
          <FormControl.Feedback>
          </FormControl.Feedback>
          <FormControl type="text"
                       placeholder="Description"
                       name="description"
                       value={this.state.description}
                       onChange={function (event) {
                             let key = event.target.name;
                             let value = event.target.value;
                             this.setState({
                               [key]: value
                             });
                             }.bind(this)
                            }
          />
        </FormGroup>
        <Button type="submit" block className="login-btn">
          Edit Bucketlist
        </Button>
      </Form>
    );
  }
}

export default EditBucketlistForm;
