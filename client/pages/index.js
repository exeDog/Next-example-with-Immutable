import React from 'react';
import Link from 'next/link';
import { Layout } from '../containers/Layout';
import NextPageSetup from '../containers/NextPageSetup';

const ChallengeOne = () => (
  <Layout>
    <h1 style={{ marginTop: 0 }}>Application + State architecture</h1>
    <div id="menu">
      <ul>
        <li>
          <Link href="#basicRequirements">
            <a>Basic Requirements</a>
          </Link>
        </li>
        <li>
          <Link href="#splashPage">
            <a>Splash Page</a>
          </Link>
        </li>
        <li>
          <Link href="#searchPage">
            <a>Search Page</a>
          </Link>
        </li>
        <li>
          <Link href="#favoritesPage">
            <a>Favorites Page</a>
          </Link>
        </li>
        <li>
          <Link href="#navigationBar">
            <a>Navigation Bar</a>
          </Link>
        </li>
        <li>
          <Link href="#extraCredit">
            <a>Extra Credit</a>
          </Link>
        </li>
      </ul>
    </div>
    <p>
      {`
        This challenge is intended to test your comfort with architecting state
        management within an application. Please read and follow the instructions
        carefully as you will be scored based on your ability to follow instructions
        as well as on your code. In this challenge, you will be building an application
        allowing users to manage their github favorites.
      `}
    </p>
    <p>
      {`
        You will be asked to build a site with the following pages, which have the
        functionality described below. The application server should be running at
        localhost:1337 - if it is not, please run "yarn run start:server" now.
      `}
    </p>
    <p>
      {`You can visit `}
      <a href="localhost:1337" target="_blank" rel="noopener noreferrer">
        localhost:1337
      </a>
      {` in the browser to view the documentation for the server api.`}
    </p>
    <p>
      {`
        The server includes a mocked database, which will hold information about
        the users of your app. Try not to modify the server, if at all possible.
      `}
    </p>
    <p>
      {`
        As you complete this challenge, please keep in mind that you will be
        assesssed on the following:
      `}
    </p>
    <ul>
      <li>Time management</li>
      <li>Application performance</li>
      <li>Limiting the size and frequency of network requests</li>
      <li>Limiting memory usage.</li>
      <li>App functionality</li>
    </ul>
    <h2 id="basicRequirements">Basic Requirements</h2>
    <div id="styled-components">
      <h3>Styled-Components</h3>
      <p>
        {`
          Use styled-components for css. Styled-components is a powerful CSS-in-JS
          library that we use in our stack. Some pre-built styled components are 
          available for you to start with. For more information, visit
        `}
        <a href="https://www.styled-components.com/docs/" target="_blank" rel="noopener noreferrer">
          Styled-Components Documentation
        </a>
      </p>
    </div>
    <div id="splashPage">
      <h3>localhost:3000/splash</h3>
      <p>
        {`
          Build a splash page at localhost:3000/splash. This page should display
          a text field where a user can enter a username (this is a username-only
          login system for simplicity). This page should offer three login options,
          all three of which should progress the user to the next page:
        `}
      </p>
      <ul>
        <li>
          {`
            Proceed as an anonymous user. This action should be triggered by
            clicking on a button saying "Continue without logging in". Clicking
            on this button should take the user directly to localhost:3000/search.
          `}
        </li>
        <li>
          {`
            Sign up using a new account. This action should be triggered by
            clicking on a button saying "Create account". Each new account should
            be unique. If a username already exists in the database, the error
            message "Username already exists" should display below or to the
            right of the text field. Clicking on "Create account" with a valid
            username should trigger the following actions:
          `}
          <ul>
            <li>
              {`
                Redirect to localhost:3000/search
              `}
            </li>
            <li>
              {`
                Create a new user in the database
              `}
            </li>
          </ul>
        </li>
        <li>
          {`
            Log in using an existing account. When a user clicks a button saying
            "Log in", they should either be logged in and redirected to
            localhost:3000/search, if the username does not exist in the database,
            should be shown an error message "Account not found".
          `}
        </li>
      </ul>
    </div>
    <div id="searchPage">
      <h3>localhost:3000/search</h3>
      <p>
        {`
          Build a page allowing users to search for github repositories by name.
          This page should display a search bar where users can type the repository
          name. Once the name reaches 3 characters in length, the results should
          populate the below the searchbar as the user types. The maximum number
          of results shown should be configurable by the user and should be
          persistent for that user every time they log in. The default if the user
          is not logged in or has not configured it should be 15.
        `}
      </p>
      <p>
        {`
          Each result should display the following information:
        `}
      </p>
      <ul>
        <li>name</li>
        <li>owner name</li>
        <li>stars</li>
      </ul>
      <p>
        {`
          Clicking on any search result should open that github repository in a
          new tab. If the user is logged in, they should be presented with a
          "Favorite" button that adds the repo to their account's list of favorites.
          For results that are already favorited, this should be replaced by an
          "Unfavorite" button with the opposite effect.
        `}
      </p>
      <p>
        {`
          If a user returns to the search page in the same "session" (ie without
          logging out), the most recent search term should be pre-populated in
          the search bar and the results of that search should be displayed.
        `}
      </p>
    </div>
    <div id="favoritesPage">
      <h3>localhost:3000/favorites</h3>
      <p>
        {`
          This page should display the user's favorited github repositories. Clicking
          on a repository should open that repository in a new tab. The following
          information should be shown for each:
        `}
      </p>
      <ul>
        <li>name</li>
        <li>owner name</li>
        <li>stars</li>
        <li>language</li>
        <li>description</li>
      </ul>
      {`
          Users should also have the ability to unfavorite individual repos.
        `}
    </div>
    <div id="navigationBar">
      <h3>Navigation bar</h3>
      <p>
        {`
          Users should see a navigation bar on every page except for the spash
          page. The content of that page depends on whether or not a user is
          logged in.
        `}
      </p>
      <p>
        {`
          Logged-in users should see the following options:
        `}
      </p>
      <ul>
        <li>
          {`
              "Log Out". Clicking on this should log the user out and return them
              to the splash page.
            `}
        </li>
        <li>
          {`
              "Favorites". Clicking on this should bring the user to
              localhost:3000/favorites
            `}
        </li>
      </ul>
      <p>
        {`
          Anonymous users should see only one option:
        `}
      </p>
      <ul>
        <li>
          {`
              "Log In". Clicking on this should return the user to the splash page.
            `}
        </li>
      </ul>
    </div>
    <h2 id="extraCredit">Extra Credit</h2>
    <p>
      {`
        If you have extra time, some extra credit opportunities include:
        `}
    </p>
    <ul>
      <li>
        {`Refactor github RESTful requests to use `}
        <a href="https://developer.github.com/v4/" target="_blank" rel="noopener noreferrer">
          GraphQL
        </a>
        {`. Bonus bonus points for using Relay or Apollo.`}
      </li>
      <li>
        {`Add `}
        <a href="https://flow.org/" target="_blank" rel="noopener noreferrer">
          Flow
        </a>
        {` to your project`}
      </li>
      <li>
        {`
            Write tests for the search and login functionity.
          `}
      </li>
    </ul>
  </Layout>
);

export default NextPageSetup(ChallengeOne);
