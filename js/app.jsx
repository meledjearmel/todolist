class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '', done:false };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDone = this.handleDone.bind(this);
    }
  
    render() {
      return (
        <div>
          <div className="main">
              <div className="todoBlock">
                <form onSubmit={this.handleSubmit}>
                  <div className="todoHead">
                    <input className="input-text" id="new-todo" onChange={this.handleChange} value={this.state.text} placeholder="Ajouter une nouvelle tache" />
                    <button className="sign">+</button>
                  </div>
                  <TodoList items={this.state.items} />
                </form>
              </div>
          </div>
        </div>
      );
    }
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
    handleSubmit(e) {
      e.preventDefault();
      if (this.state.text.length === 0) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now(),
        done: false,
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }

    handleDone () {
      this.setState({done: e.target.value})
    }
  }
  
  class TodoList extends React.Component {

    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className="todoContent">
            {this.props.items.map((item,id) => (
              <div key={id} className="todoBody">
                <TodoDone keyId={id} text={item.text}/>
                <TodoDelete keyId={id} items={this.props.items}/>
              </div>
            ))}
        </div>
      );
    }
  }

  class TodoDelete extends React.Component {
      constructor(props) {
        super(props)
        this.props.keyId
        this.props.items
        this.handleDelete = this.handleDelete.bind(this)
      }
      render() {
        return (
          <div className="tache-action">
            <span onClick={this.handleDelete} className="del">Supprimer</span>
          </div>
        )
      }

      handleDelete () {
        if (this.props.keyId == 0) {
          this.props.items.splice(this.props.keyId, this.props.keyId+1)
        } else {
          this.props.items.splice(this.props.keyId, this.props.keyId)
        }
        document.querySelector(`#tache-${this.props.keyId}`).innerText = 'Tache supprimer'
        document.querySelector(`#tache-${this.props.keyId}`).style.color = 'red'
        document.querySelector(`#tache-${this.props.keyId}`).style.textDecoration = 'none'
      }
  }

  class TodoDone extends React.Component {
    constructor(props) {
      super(props)
      this.props.keyId
      this.props.text
      this.handleDone = this.handleDone.bind(this)
    }
    render() {
      return (
        <div className="tache-dash">
            <span className="tache" id={`tache-${this.props.keyId}`}>{this.props.text}</span> <input onClick={this.handleDone} type="checkbox" name="check" id="check"/>
        </div>
      )
    }

    handleDone (e) {
      if (e.target.checked) {
        document.querySelector(`#tache-${this.props.keyId}`).style.textDecoration = 'line-through'
        document.querySelector(`#tache-${this.props.keyId}`).style.color = 'green'
        document.querySelector(`#tache-${this.props.keyId}`).style.fontStyle = 'italic'
      } else {
        document.querySelector(`#tache-${this.props.keyId}`).style.textDecoration = 'none'
        document.querySelector(`#tache-${this.props.keyId}`).style.color = 'black'
        document.querySelector(`#tache-${this.props.keyId}`).style.fontStyle = 'normal'
      }
    }
}
  
  ReactDOM.render(
    <TodoApp />,
    document.getElementById('root')
  );
  