import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect } from '@jest/globals';

import Home from 'pages';

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });

    expect(heading.tagName).toEqual('H1');
    expect(container).toMatchSnapshot();
  });
});
