import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('add 2 product to card and calculate total price', async () => {
  //mock data
  jest.spyOn(window, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      shoes: [{
        "id": 1,
        "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-mens-running-shoe-wide-D24Mcz-removebg-preview.png",
        "name": "Nike Air Zoom Pegasus 36",
        "description": "The iconic Nike Air Zoom Pegasus 36 offers more cooling and mesh that targets breathability across high-heat areas. A slimmer heel collar and tongue reduce bulk, while exposed cables give you a snug fit at higher speeds.",
        "price": 108.97,
        "color": "#e1e7ed"
      },
      {
        "id": 2,
        "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-shield-mens-running-shoe-24FBGb__1_-removebg-preview.png",
        "name": "Nike Air Zoom Pegasus 36 Shield",
        "description": "The Nike Air Zoom Pegasus 36 Shield gets updated to conquer wet routes. A water-repellent upper combines with an outsole that helps create grip on wet surfaces, letting you run in confidence despite the weather.",
        "price": 89.97,
        "color": "#4D317F"
      },
      {
        "id": 3,
        "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/cruzrone-unisex-shoe-T2rRwS-removebg-preview.png",
        "name": "Nike CruzrOne",
        "description": "Designed for steady, easy-paced movement, the Nike CruzrOne keeps you going. Its rocker-shaped sole and plush, lightweight cushioning let you move naturally and comfortably. The padded collar is lined with soft wool, adding luxury to every step, while mesh details let your foot breathe. There’s no finish line—there’s only you, one step after the next.",
        "price": 100.97,
        "color": "#E8D026"
      },
      ] 
    }),
  });
  //render component
  render(<App />);
  await waitFor(async () => {
    //step execute
    let addButton = screen.getAllByTestId('shoe-add-btn')[0];
    fireEvent.click(addButton);
    addButton = screen.getAllByTestId('shoe-add-btn')[1];
    fireEvent.click(addButton);
    //get actual result
    const totalPriceElement = screen.getByTestId('total-price');
    //expected result
    expect(totalPriceElement.textContent).toContain('198.94');
  });
});
test('add 2 product to card remove 1 and calculate total price', async () => {
  //mock data
  jest.spyOn(window, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      shoes: [{
        "id": 1,
        "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-mens-running-shoe-wide-D24Mcz-removebg-preview.png",
        "name": "Nike Air Zoom Pegasus 36",
        "description": "The iconic Nike Air Zoom Pegasus 36 offers more cooling and mesh that targets breathability across high-heat areas. A slimmer heel collar and tongue reduce bulk, while exposed cables give you a snug fit at higher speeds.",
        "price": 108.97,
        "color": "#e1e7ed"
      },
      {
        "id": 2,
        "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-shield-mens-running-shoe-24FBGb__1_-removebg-preview.png",
        "name": "Nike Air Zoom Pegasus 36 Shield",
        "description": "The Nike Air Zoom Pegasus 36 Shield gets updated to conquer wet routes. A water-repellent upper combines with an outsole that helps create grip on wet surfaces, letting you run in confidence despite the weather.",
        "price": 89.97,
        "color": "#4D317F"
      },
      {
        "id": 3,
        "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/cruzrone-unisex-shoe-T2rRwS-removebg-preview.png",
        "name": "Nike CruzrOne",
        "description": "Designed for steady, easy-paced movement, the Nike CruzrOne keeps you going. Its rocker-shaped sole and plush, lightweight cushioning let you move naturally and comfortably. The padded collar is lined with soft wool, adding luxury to every step, while mesh details let your foot breathe. There’s no finish line—there’s only you, one step after the next.",
        "price": 100.97,
        "color": "#E8D026"
      },
      ] 
    }),
  });
  //render component
  render(<App />);
  await waitFor(async () => {
    //step execute
    let addButton = screen.getAllByTestId('shoe-add-btn')[0];
    fireEvent.click(addButton);
    addButton = screen.getAllByTestId('shoe-add-btn')[1];
    fireEvent.click(addButton);
    let removeButton = screen.getAllByTestId('remove')[0];
    fireEvent.click(removeButton);
    //get actual result
    const totalPriceElement = screen.getByTestId('total-price');
    //expected result
    expect(totalPriceElement.textContent).toContain('89.97');
  });
});
