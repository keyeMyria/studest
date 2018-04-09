import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import queryString from 'query-string';

import SearchForm from '../core/SearchForm';

export const query = gql`
  query ListViewSearch($search: String, $endCursor: String) {
    allTests(first: 2, name_Icontains: $search, after: $endCursor) {
      edges {
        node {
          id
          name
          description
          created
          minutes
          uuid
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

require('../../../style/index.css');

const mapStateToProps = state => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    // ...bindActionCreators(login, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class TestsView extends Component {
  static propTypes = {
  };

  componentDidMount() {
    // this.props.getAwesomeCode();
  }

  handleSubmit = (data, dispatch, form) => {
    console.warn('handleSubmit', data, dispatch, form);
    console.warn('handleSubmit', this.props);
    const formData = this.props.form.search.values;
    const searchQuery = `?search=${formData ? formData.search : ''}`;
    this.props.history.push(`/tests/${searchQuery}`);
  };

  render() {
    const { data } = this.props;
    const initialSearch = queryString.parse(this.props.location.search).search;
    if (data.loading || !data.allTests) {
      return <div>Loading...</div>;
    }
    return (
      <Fragment>
        <h1>Tests</h1>
        <div>
          <SearchForm onSubmit={this.handleSubmit} initialValues={initialSearch} />
          {data.allTests.edges.map(item => (
            <p key={item.node.id}>
              <Link to={`/tests/${item.node.uuid}/details/`}>{item.node.name}</Link>
            </p>
          ))}
          {data.allTests.pageInfo.hasNextPage && (
            <button onClick={() => this.loadMore()}>Load more...</button>
          )}
        </div>
      </Fragment>
    );
  }
}


const queryOptions = {
  options: props => ({
    variables: {
      search: queryString.parse(props.location.search).search,
      endCursor: null,
    },
  }),
};

// eslint-disable-next-line no-class-assign
TestsView = graphql(query, queryOptions)(TestsView);
export default TestsView;