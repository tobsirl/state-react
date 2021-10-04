import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 3
    }
  }

  render() {
    const {count} = this.state
    
    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button>Increment</button>
          <button>Decrement</button>
          <button>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;