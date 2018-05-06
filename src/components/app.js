import React, { Component } from 'react'
import {reduxForm} from 'redux-form';
import mitt from 'mitt'
import Question from './question';
import validate from "../utils/validate";

let emitter = mitt();

class App extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 0,
      categories: [
        { id: 0, score: 0, name: 'Income Tax'},
        { id: 1, score: 0, name: 'Public Health'},
        { id: 2, score: 0, name: 'Entrepreneurship'},
        { id: 3, score: 0, name: 'Community Art'},
        { id: 4, score: 0, name: 'Immigration'}
      ],
      questions: [
        { id: 0, name: 'question0', text: 'Shall we begin the quiz?',
          yes:[
            {id:0, score:0},
            {id:1, score:0},
            {id:2, score:0},
            {id:3, score:0},
            {id:4, score:0}
          ],
          no:[
            {id:0, score:0},
            {id:1, score:0},
            {id:2, score:0},
            {id:3, score:0},
            {id:4, score:0}
          ]
        },
        { id: 1, name: 'question1', text: 'Should we build more schools?',
          yes:[
            {id:0, score:5},
            {id:1, score:2},
            {id:2, score:3},
            {id:3, score:-3},
            {id:4, score:0}
          ],
          no:[
            {id:0, score:-3},
            {id:1, score:-5},
            {id:2, score:-1},
            {id:3, score:4},
            {id:4, score:0}
          ]
        },
        { id: 2, name: 'question2', text: 'Should we build more roads?',
          yes:[
            {id:0, score:2},
            {id:1, score:3},
            {id:2, score:4},
            {id:3, score:-1},
            {id:4, score:2}
          ],
          no:[
            {id:0, score:-1},
            {id:1, score:-2},
            {id:2, score:-3},
            {id:3, score:-4},
            {id:4, score:2}
          ]
        },
        { id: 3, name: 'question3', text: 'Should we build more bike lanes?',
          yes:[
            {id:0, score:5},
            {id:1, score:2},
            {id:2, score:3},
            {id:3, score:-3},
            {id:4, score:0}
          ],
          no:[
            {id:0, score:-3},
            {id:1, score:-5},
            {id:2, score:-1},
            {id:3, score:4},
            {id:4, score:0}
          ]
        },
        { id: 4, name: 'question4', text: 'Should we build more bridges?',
          yes:[
            {id:0, score:5},
            {id:1, score:4},
            {id:2, score:3},
            {id:3, score:2},
            {id:4, score:1}
          ],
          no:[
            {id:0, score:-5},
            {id:1, score:-4},
            {id:2, score:-3},
            {id:3, score:2},
            {id:4, score:1}
          ]
        },
        { id: 5, name: 'question5', text: 'Should we build more subways?',
          yes:[
            {id:0, score:15},
            {id:1, score:14},
            {id:2, score:13},
            {id:3, score:12},
            {id:4, score:9}
          ],
          no:[
            {id:0, score:-15},
            {id:1, score:-14},
            {id:2, score:-13},
            {id:3, score:-12},
            {id:4, score:-9}
          ]
        },
      ]
    }
  }
  nextPage(values) {
    // console.log(this);
    const { page, categories, questions } = this.state;
    const answer = values[questions[page].name];
    const answerValues = questions[page][answer];
    const updatedCategories = categories.map((category, index) => {
      category.score = category.score + answerValues[index].score;
      return category;
    });

    let newPage = page + 1;
    if(newPage > questions.length - 1) {
      alert('thanks for taking our quiz');
      // TODO: do a graceful reset
      // newPage = 0;
      // this.props.reset();
      newPage = page; // stay on current page while app reloads
      document.location.reload();
    }

    this.setState({
      page: newPage,
      categories: updatedCategories
    }, () => {
      // send data out to Viz App
      emitter.emit('setState', this.state);
    });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { page, questions, categories } = this.state;
    const question = questions[page];
    return (<React.Fragment>
        <Question onSubmit={this.nextPage} question={question} categories={categories} page={page} emitter={emitter} />
      </React.Fragment>
    )
  }
}

emitter.on('setState', e => console.log('setState', e) );
emitter.on('thing', e => console.log('thing', e) );

// export default App;
export default reduxForm({
  form: 'LPCodeTest',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validate,
})(App)