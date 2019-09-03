import React from 'react';
import moment from 'moment';
import NoResultsMessage from '../statuses/NoResultsMessage';
import marked from 'marked';

const SearchResults = ({ results }) => {
  const formattedResults =
    results.items[0] &&
    results.items.map(item => {
      const htmlUrl = item.html_url.split('/');
      const userName = htmlUrl[3];
      const repoName = htmlUrl[4];
      const issueAge = moment(item.created_at).fromNow();

      let bodyText;
      if (item.body) {
        if (item.body.length === 0) {
          bodyText = '(no text provided)';
        } else if (item.body.length < 300) {
          bodyText = item.body;
        } else if (item.body.length > 300) {
          bodyText = `${item.body.substr(0, 300)}...`;
        }
      }

      const mappedLabels = item.labels.map(label => {
        return (
          <span key={label.id} style={{ color: `#${label.color}` }}>
            {label.name}
          </span>
        );
      });
      console.log('bodyText:', bodyText);

      return (
        <div className="result" key={item.id}>
          <img src={item.user.avatar_url} width="50px" alt="avatar" />

          <a href={item.html_url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>

          {bodyText && <div dangerouslySetInnerHTML={{ __html: marked(bodyText) }} />}

          <div>{`${userName}/${repoName}`}</div>
          <div>{issueAge}</div>

          <p>{mappedLabels}</p>

          <br />
          <br />
        </div>
      );
    });

  return (
    <div className="results">
      {results.total_count > 0 && (
        <h4 className="results-count">Total results: {results.total_count.toLocaleString()}</h4>
      )}
      {formattedResults}
      {results.total_count === 0 && <NoResultsMessage />}
    </div>
  );
};

export default SearchResults;
