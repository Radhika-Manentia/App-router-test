// export default function addButtonToToolbar({
//   id,
//   title,
//   container,
//   onClick,
// }: {
//   id?: string;
//   title: string;
//   container?: HTMLElement;
//   onClick: () => void;
// }) {
//   const button = document.createElement('button');

//   button.id = id;
//   button.innerHTML = title;
//   button.onclick = onClick;

//   container = container ?? document.getElementById('demo-toolbar');
//   container.append(button);

//   return button;
// }




export default function addButtonToToolbar({
  id,
  title,
  container,
  onClick,
}) {
  // Create a new button element
  const button = document.createElement('button');

  // Set the button's id and innerHTML (displayed text)
  button.id = id;
  button.innerHTML = title;

  // Set the button's click event handler
  button.onclick = onClick;

  // If a container is provided, use it; otherwise, use the default demo-toolbar
  container = container || document.getElementById('demo-toolbar');

  // Append the button to the specified container
  container.append(button);

  // Return the created button
  return button;
}
