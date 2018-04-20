import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    title: "",
    beginningYear: "",
    endingYear: "",
    url: "",
    synopsis: "",
    deleted: false,
    results: [],
    saved: []  
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "",beginningYear: "",
        endingYear: "", url: "", synopsis: "",  })

      )
      .catch(err => console.log("Error from loadArticles ", err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    let value  = event.target.value;
    // This grabs the first 4 characters in the field
    if (name === "beginningYear" || name === "endingYear") {
      value = value.substring(0, 4);
    }
    this.setState({
      [name]: value
    });
  };

  validateDates = () => {
    let beginningYear = this.state.beginningYear;
    let endingYear = this.state.endingYear;
    if (beginningYear.length < 4 || endingYear.length < 4) {
        alert("Year needs to be 4 digits long")
    }
    else return true
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    let valid = this.validateDates();
    if (valid) {
        this.searchAPI();
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveArticle({
        title: this.state.title,
        beginningYear: this.state.beginningYear,
        endingYear: this.state.endingYear,
        url: this.state.url
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  

  searchAPI = () => {
    let title = this.state.title;
    let beginningYear = this.state.beginningYear;
    let endingYear = this.state.endingYear;
    let query = "&q=" + title +
    "&begin_date=" +
    beginningYear + "0101" +
    "&end_date=" +  
    endingYear + "1231";
    console.log("query: " + query);
    API.searchArticle(query)
     .then(res => {this.setState({results: res.data.response.docs})})
     .catch(err => console.log(err));

    this.setState({
      title: "",
      beginningYear: "",
      endingYear: ""
    })
    console.log("API+++++++++++++++++++++++");
    console.log(this.state);
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-2">
          </Col>
          <Col size="md-8">
            <Jumbotron>
              <h1>Enter Article Title</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.beginningYear}
                onChange={this.handleInputChange}
                name="beginningYear"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.endingYear}
                onChange={this.handleInputChange}
                name="endingYear"
                placeholder="End Year (required)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleSearchSubmit}
              >
                Submit Article
              </FormBtn>
            </form>
          </Col>
          <Col size="md-2">
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
          </Col>
          <Col size="md-8">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.beginningYear}
                onChange={this.handleInputChange}
                name="beginningYear"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.endingYear}
                onChange={this.handleInputChange}
                name="endingYear"
                placeholder="End Year (required)"
              />
              <Input
                value={this.state.url}
                onChange={this.handleInputChange}
                name="url"
                placeholder="URL (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Article
              </FormBtn>
            </form>
          </Col>
          <Col size="md-2">
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
          </Col>

          
          <Col size="md-8 sm-12">
            <Jumbotron>
              <h1>Saved articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title} on this date {article.beginningYear}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-2">
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;


