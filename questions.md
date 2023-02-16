#### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

"Component" will re-render when its parent component re-renders, while a "PureComponent" avoids re-renders by performing a shallow comparison of props.
So, it would be a problem if a 'PureComponent' receives a prop from the parent component that mutates its content but still points to the same memory reference.

#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Using ShouldComponentUpdate with Context can accidentally prevent the context data from being passed further down the component tree if the actual component is not allowed to update due to some condition.

#### 3. Describe 3 ways to pass information from a component to its PARENT.

- Using the React Context API exposing properties defined in the provider.
- Using function as a property (a.k.a callbacks)
- Using a event store dispatch/subscribe system (e.g. Redux)

#### 4. Give 2 ways to prevent components from re-rendering.

- Wrapping a component with `React.memo`.
- Using `React.useCallback` when passing functions as props to children.

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments are useful in cases where you want to provide a single child but don't want any extra HTML element wrapping a list of elements. 
When using fragments, you may experience unexpected styling behavior if you don't pay attention to the parent CSS display property, such as `display: flex`.

#### 6. Give 3 examples of the HOC pattern.

- Share logic between components (e.g. provide a logout method for removing the current user session).
- Add lifecycle methods (e.g. tear down some async or external resource when the root element unmounts).
- Extend props passed down the tree (e.g. if the current user is a premium member, pass down a different style theme).

#### 7. What's the difference in handling exceptions in promises, callbacks and async...await.

The main difference is that with async/await, the exception needs to be captured with a try-catch block, whereas Promises can handle rejection by chaining a catch function or by accessing the error inside the callback function argument.

#### 8. How many arguments does setState take and why is it async.

It takes one argument, but it can be either an object and callback function.
Making it asynchronous allows React to take control of batching and when to apply any changes for better performance, as it triggers a re-render.

#### 9. List the steps needed to migrate a Class to Function Component.

- Convert the class to a function.
- Replace the constructor and any instance assignments with the hooks API.
- Replace some lifecycle methods, such as componentDidMount, with the hooks API.
- Convert methods to functions.
- Remove the render method and make the component return its value.
    
#### 10. List a few ways styles can be used with components.

- Inline styles.
- CSS Stylesheets.
- CSS Modules.
- CSS using Javascript (Styled Components, Emotion, etc).

#### 11. How to render an HTML string coming from the server.

Using an attribute called `dangerouslySetInnerHTML`.