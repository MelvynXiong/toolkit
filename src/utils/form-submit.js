export default (formProps) => {
  const { method = "post", url, data = {} } = formProps;
  const form = document.createElement("form");
  form.action = url;
  form.method = method;
  Object.keys(data).forEach((item) => {
    const ele = document.createElement("input");
    ele.setAttribute("type", "hidden");
    ele.setAttribute("name", item);
    form.appendChild(ele);
    ele.setAttribute("value", data[item]);
  });
  document.body.appendChild(form);
  form.submit();
};
