var React = require('react')
  , firebase = require('firebase')
  ;

var ToDoApp = React.createClass({
  getInitialState: function () {
    return {projects: {}};
  },
  componentWillMount: function () {
    this.firebaseRef = new Firebase("https://shining-fire-6174.firebaseio.com/");
    this.firebaseRef.child("projects").on("value", function(snapshot) {
      this.setState({projects: snapshot.val()})
    }.bind(this));
  },
  render: function () {
    var projects = Object.keys(this.state.projects).map(function(key, index) {
      return (<h3 key={key}>{key}</h3>);
    }.bind(this));

    return (
      <div className="app">
        This is a ToDo App
        {projects}
      </div>
    );
  }
});
React.render(
  <ToDoApp />,
  document.getElementById('content')
);