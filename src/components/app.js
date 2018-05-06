import React, { Component } from 'react'
import {reduxForm} from 'redux-form';
import mitt from 'mitt'
import Question from './question';
import validate from "../utils/validate";
import three from "./threeApp";

let emitter = mitt();
three.start(emitter);

class App extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();

    emitter.on('drag', x => {
      const xYes = 100 + (x/8*100);
      const xNo = 100 - (x/8*100);
      const yes = document.querySelector('.Yes');
      const no = document.querySelector('.No');
      yes.style.height = `${xYes}px`;
      yes.style.width = `${xYes}px`;
      no.style.height = `${xNo}px`;
      no.style.width = `${xNo}px`;

      const { page, questions } = this.state;
      if(x > 1.2) {
        this.props.change(questions[page].name, "yes");
      }
      if(x < -1.2) {
        this.props.change(questions[page].name, "no");
      }
    });
    emitter.on('dragEnd', e => {
      const { page, questions } = this.state;
      const values = this.child.current.values;
      console.log(values);
      console.log(values[questions[page].name]);
      if(values[questions[page].name]){
        this.nextPage(this.child.current.values);
      }
    });

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
      // send data out to Three App
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
        <Question ref={this.child} onSubmit={this.nextPage} question={question} categories={categories} page={page} emitter={emitter} />
      </React.Fragment>
    )
  }
}

export default reduxForm({
  form: 'LPCodeTest',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validate,
})(App)