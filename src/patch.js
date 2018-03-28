import React, {createElement} from 'react';
import createHyperscript from './createHyperscript';

React.createElement = createHyperscript(createElement);
