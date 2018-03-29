import React, {createElement} from 'react';
import {createHyperscript} from './index';

React.createElement = createHyperscript(createElement);
