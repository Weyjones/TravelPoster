import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './signin';
describe('Testing SignIn', () => {
    it('SignIn has three input', () => {
        const inputField = shallow(<SignIn />);
        expect(inputField.find('input').length).toEqual(3);
    });
});
