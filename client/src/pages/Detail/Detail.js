import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Detail extends Component {
  state = {
    article: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getArticle(this.props.match.params.id)
      .then(res => this.setState({ article: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-2">
          </Col>
          <Col size="md-8">
            <Jumbotron>
              <h2>
                {this.state.article.title}
              </h2>
            </Jumbotron>
          </Col>
          <Col size="md-2">
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
          </Col>
          <Col size="md-8">
            <article>
              <br></br>
              <h3>Synopsis</h3>
              <br></br>
              <h5>
                {this.state.article.synopsis}
              </h5>
              <br></br>
              <p>Here is the link to the article</p>
              <a href={this.state.article.url}>{this.state.article.url}</a>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Articles</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
