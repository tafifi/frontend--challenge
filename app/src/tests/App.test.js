import React, { useState } from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { Button } from '../components/Button';
import { act, Simulate } from "react-dom/test-utils";
import { Search } from 'react-feather';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders button with text", () => {
  act(() => {
    render(<Button>Hello World</Button>, container);
  });
  expect(container.querySelector('.button span').textContent).toBe("Hello World");
})

it("renders button while loading", () => {
  act(() => {
    render(<Button loading>Hello World</Button>, container);
  });
  expect(container.querySelector('.button').classList).toContain("loading");
})


it("renders search field correctly", () => {
  act(() => {
    render(<Search value="Find Me!" className="main-search" onChange={() => null} />, container);
  });

  const input = container.querySelector('.main-search');

  expect(input.getAttribute('value')).toBe("Find Me!");
})
