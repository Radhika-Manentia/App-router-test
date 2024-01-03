// export default function addSliderToToolbar({
//   id,
//   title,
//   range,
//   step,
//   defaultValue,
//   container,
//   onSelectedValueChange,
//   updateLabelOnChange,
// }: {
//   id?: string;
//   title: string;
//   range: number[];
//   step?: number;
//   defaultValue: number;
//   container?: HTMLElement;
//   onSelectedValueChange: (value: string) => void;
//   updateLabelOnChange?: (value: string, label: HTMLElement) => void;
// }) {
//   const label = document.createElement('label');
//   const input = document.createElement('input');

//   if (id) {
//     input.id = id;
//     label.id = `${id}-label`;
//   }

//   label.htmlFor = title;
//   label.innerText = title;

//   input.type = 'range';
//   input.name = title;
//   input.min = String(range[0]);
//   input.max = String(range[1]);

//   // add step before setting its value to make sure it works for step different than 1.
//   // Example: range (0-1), step (0.1) and value (0.5)
//   if (step) {
//     input.step = String(step);
//   }

//   input.value = String(defaultValue);

//   input.oninput = (evt) => {
//     const selectElement = <HTMLSelectElement>evt.target;

//     if (selectElement) {
//       onSelectedValueChange(selectElement.value);
//       if (updateLabelOnChange !== undefined) {
//         updateLabelOnChange(selectElement.value, label);
//       }
//     }
//   };

//   container = container ?? document.getElementById('demo-toolbar');
//   container.append(label);
//   container.append(input);
// }


function addSliderToToolbar({
  id,
  title,
  range,
  step,
  defaultValue,
  container,
  onSelectedValueChange,
  updateLabelOnChange,
}) {
  const label = document.createElement('label');
  const input = document.createElement('input');

  if (id) {
    input.id = id;
    label.id = `${id}-label`;
  }

  label.htmlFor = title;
  label.innerText = title;

  input.type = 'range';
  input.name = title;
  input.min = String(range[0]);
  input.max = String(range[1]);

  // add step before setting its value to make sure it works for step different than 1.
  // Example: range (0-1), step (0.1) and value (0.5)
  if (step) {
    input.step = String(step);
  }

  input.value = String(defaultValue);

  input.oninput = (evt) => {
    const selectElement = evt.target;

    if (selectElement) {
      onSelectedValueChange(selectElement.value);
      if (updateLabelOnChange !== undefined) {
        updateLabelOnChange(selectElement.value, label);
      }
    }
  };

  container = container || document.getElementById('demo-toolbar');
  container.append(label);
  container.append(input);
}

// Example usage:
addSliderToToolbar({
  id: 'mySlider',
  title: 'Slider Title',
  range: [0, 100],
  step: 5,
  defaultValue: 50,
  container: document.getElementById('custom-toolbar'),
  onSelectedValueChange: (value) => {
    console.log('Selected value changed:', value);
  },
  updateLabelOnChange: (value, label) => {
    label.innerText = `${value} units`;
  },
});
