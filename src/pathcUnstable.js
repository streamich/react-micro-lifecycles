import React from 'react';
import createHyperscriptUnstable from './createHyperscriptUnstable';

React.createElement = createHyperscriptUnstable(React.createElement, React.Component);
