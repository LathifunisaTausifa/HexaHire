import React from "react";

function Forms() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "9c8a7699-43a0-444d-96d5-e34a538ee4bf");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
      <form onSubmit={onSubmit}>
        <input type="text" name="name"/>Name
        <input type="email" name="email"/>Email
        <textarea name="message">Message</textarea>
        <button type="submit">Submit Form</button>
      </form>
  );
}

export default Forms;