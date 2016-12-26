/* @flow */

it('renders without crashing', () => {
  const div = document.createElement('div');

  div.setAttribute('id', 'root');

  document.body.appendChild(div);

  require('./index');
});
