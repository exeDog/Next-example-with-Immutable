import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const TableBase = ({ className, props, isLoggedIn, maxRepos, pageType, toggleFavorite }) => {
  const headings = ['Name', 'Owner Name', 'Stars'];
  if (isLoggedIn) {
    headings.push('Favorite');
  }
  if (pageType === 'favorite') {
    headings.push('language', 'description');
  }

  let data = [];
  if (props.length > 0) {
    if (props.length > maxRepos) {
      data = props.slice(0, maxRepos);
      data = data.map(repo => (<tr key={repo.name}>
        <td><a href={repo.html_url} target='_blank'>{repo.name}</a></td>
        <td>{repo.owner.login}</td>
        <td>{repo.stargazers_count}</td>
        {isLoggedIn && <td><Button onClick={() => toggleFavorite(repo)}>Favorite</Button></td>}
        {pageType === 'favorite' && <td>{repo.language}</td>}
        {pageType === 'favorite' && <td>{repo.description}</td>}
      </tr>));
    } else {
      data = props.map(repo => (<tr key={repo.name}>
        <td><a href={repo.html_url} target='_blank'>{repo.name}</a></td>
        <td>{repo.owner.login}</td>
        <td>{repo.stargazers_count}</td>
        {isLoggedIn && <td><Button onClick={() => toggleFavorite(repo)}>Favorite</Button></td>}
        {pageType === 'favorite' && <td>{repo.language}</td>}
        {pageType === 'favorite' && <td>{repo.description}</td>}
      </tr>));
    }
  }


  return (
    <div className={className}>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              {headings.map(heading => <th key={heading}>{heading}</th>)}
            </tr>
          </thead>
        </table>
      </div>
      <div className='tbl-content'>
        <table
          cellPadding='0'
          cellSpacing='0'
          border='0'>
          <tbody>
            {data}
          </tbody>
        </table>
      </div>
      <style jsx>{`
      .tbl-header {
         background-color: #860037;
      }
      .tbl-content {
         height:300px;
         margin-top: 0px;
         border: 1px solid rgba(255,255,255,0.3);
      }
      `}</style>
    </div>
  );
};

export const Table = styled(TableBase)`
margin-top: 25px;
table {
  width:100%;
}
th {
   padding: 20px 15px;
   text-align: left;
   font-weight: 500;
   font-size: 12px;
   color: #fff;
   text-transform: uppercase;
    }
td {
   max-width:10px;
   padding: 15px;
   text-align: left;
   vertical-align:middle;
   font-weight: 300;
   font-size: 12px;
   color: #000;
   border-bottom: solid 1px #860037;
   } 
`
