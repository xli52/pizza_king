$(() => {
  localStorage.click = 1;

  $('.fa-circle-plus').on('click', () => {
    localStorage.click++;
    console.log(localStorage.click)
  });
});
