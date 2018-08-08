import React, { Component } from 'react';
import './App.css';


/*
	Fat arrow functions have been used to consider the latest practices of ECMA 6
*/

class Comment extends Component
{

  constructor()
  {
    super();

    
    this.state={
     editing:false 
    };

  }
 

  edit = () =>
  {
      this.setState({editing:true});   //setState is a predefined function. Every time it gets called, the virtual DOM is redesigned.   
     

  }

  save = () =>
  {
      let val = this.refs.newText.value;
      this.props.updateCommentText(val,this.props.index);
      this.setState({editing:false});
      
  }

  remove = () =>
  {
      console.log("removing Comment");
      this.props.removeComment(this.props.index);
  }

  
  //renders view in NON-EDITING mode.
  renderNormal()
  {
      return(
        <div className="commentContainer">
          <div className="card-header norm">{this.props.children}</div>
          <div class="card-body">
            <button onClick={this.edit} className="btn btn-primary">Edit</button>
            <button onClick={this.remove} className="btn btn-danger">Remove</button>
          </div>
        </div> 
      );
  }


//renders view in EDITING mode.
  renderForm()
  {
      return(
        <div className="commentContainer">
          <textarea className="form-control card-header norm" ref="newText" defaultValue={this.props.children}></textarea>
          <div class="card-body">
            <button onClick={this.save} className="btn btn-success">Save</button>
          </div>
        </div> 
      );
  }

  render()
  {
	  
	  //to see if the mode is editing
      if(this.state.editing)
      {
          return this.renderForm();
      }
      else
      {
          return this.renderNormal();
      }
  }
}


//Layout Component for all the other components
class Board extends Component
{
  constructor(props)
  {
      super(props);

	  
      this.state={
        comments: [
            "eggs",
            "milk",
            "golden retriever",
            "onion"
        ]
      }
  }

  removeComment = (i) =>
  {
    console.log('Removing Comment: '+i);
    let arr = this.state.comments;
    arr.splice(i,1);
    this.setState({comments:arr});
  }

  updateComment = (text,i) =>
  {
    console.log('Updating Comment: '+i);
    let arr = this.state.comments;
    arr[i] = text;
    this.setState({comments:arr});
  }

  eachComment = (text,i) =>
  {
    return(
            <Comment className="card text-white bg-primary mb-3"  key={i} index={i} updateCommentText={this.updateComment} removeComment={this.removeComment}>
                    {text}
            </Comment>
      );
  }

  render()
  {
    return (
        <div className="App container">
          <h1>Note App using ReactJS</h1>
          <hr />
          {
			  //mapping "commments" state with <Comment> component.
              this.state.comments.map(this.eachComment)
          }
        </div>
      );
  }
}



//only made to cover up <Board > component
class App extends Component {
  render() {
    return (
      <Board className="centre"/>  //since class is a predefined keyword, "className" is used in JSX
    );
  }
}

export default App;
