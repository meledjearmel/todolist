"use strict";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      done: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  render() {
    return React.createElement("div", null, React.createElement("div", {
      className: "main"
    }, React.createElement("div", {
      className: "todoBlock"
    }, React.createElement("form", {
      onSubmit: this.handleSubmit
    }, React.createElement("div", {
      className: "todoHead"
    }, React.createElement("input", {
      className: "input-text",
      id: "new-todo",
      onChange: this.handleChange,
      value: this.state.text,
      placeholder: "Ajouter une nouvelle tache"
    }), React.createElement("button", {
      className: "sign"
    }, "+")), React.createElement(TodoList, {
      items: this.state.items
    })))));
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.text.length === 0) {
      return;
    }

    const newItem = {
      text: this.state.text,
      id: Date.now(),
      done: false
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  handleDone() {
    this.setState({
      done: e.target.value
    });
  }

}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("div", {
      className: "todoContent"
    }, this.props.items.map((item, id) => React.createElement("div", {
      key: id,
      className: "todoBody"
    }, React.createElement(TodoDone, {
      keyId: id,
      text: item.text
    }), React.createElement(TodoDelete, {
      keyId: id,
      items: this.props.items
    }))));
  }

}

class TodoDelete extends React.Component {
  constructor(props) {
    super(props);
    this.props.keyId;
    this.props.items;
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return React.createElement("div", {
      className: "tache-action"
    }, React.createElement("span", {
      onClick: this.handleDelete,
      className: "del"
    }, "Supprimer"));
  }

  handleDelete() {
    if (this.props.keyId == 0) {
      this.props.items.splice(this.props.keyId, this.props.keyId + 1);
    } else {
      this.props.items.splice(this.props.keyId, this.props.keyId);
    }

    document.querySelector(`#tache-${this.props.keyId}`).innerText = 'Tache supprimer';
    document.querySelector(`#tache-${this.props.keyId}`).style.color = 'red';
    document.querySelector(`#tache-${this.props.keyId}`).style.textDecoration = 'none';
  }

}

class TodoDone extends React.Component {
  constructor(props) {
    super(props);
    this.props.keyId;
    this.props.text;
    this.handleDone = this.handleDone.bind(this);
  }

  render() {
    return React.createElement("div", {
      className: "tache-dash"
    }, React.createElement("span", {
      className: "tache",
      id: `tache-${this.props.keyId}`
    }, this.props.text), " ", React.createElement("input", {
      onClick: this.handleDone,
      type: "checkbox",
      name: "check",
      id: "check"
    }));
  }

  handleDone(e) {
    if (e.target.checked) {
      document.querySelector(`#tache-${this.props.keyId}`).style.textDecoration = 'line-through';
      document.querySelector(`#tache-${this.props.keyId}`).style.color = 'green';
      document.querySelector(`#tache-${this.props.keyId}`).style.fontStyle = 'italic';
    } else {
      document.querySelector(`#tache-${this.props.keyId}`).style.textDecoration = 'none';
      document.querySelector(`#tache-${this.props.keyId}`).style.color = 'black';
      document.querySelector(`#tache-${this.props.keyId}`).style.fontStyle = 'normal';
    }
  }

}

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));