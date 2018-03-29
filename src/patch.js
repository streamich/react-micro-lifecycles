import React from 'react';
import createHyperscriptStable from './createHyperscriptStable';

React.createElement = createHyperscriptStable(React.createElement, React.Component);
