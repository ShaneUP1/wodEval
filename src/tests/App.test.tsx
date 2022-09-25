import React from 'react';
import { render } from '@testing-library/react';

import App from '../App';

test('renders 6 cards on the page', () => {
    const { getByTestId } = render(<App />);

    Array.from(new Array(5)).map((value, index) => {
        return (
            getByTestId(`wodCard-${index}-container`)
        );
    });
});
