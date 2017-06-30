import React from "react";
import SingleInput from "./components/SingleInput";
import Select from "./components/Select";
import TextArea from "./components/TextArea";
import client from "./client";

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalOptions: ["vapor", "sst", "continent"],
      loopOptions: ["true", "false"],
      fields: {
        lon: "",
        lat: "",
        global: "",
        loop: "",
        title: "",
        text: ""
      },
      fieldErrors: {}
    };
  }

  onInputChange = ({ name, value, error }) => {
    const { fields, fieldErrors } = this.state;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  };

  validate = () => {
    const { fields, fieldErrors } = this.state;
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);

    if (!fields.lon) return true;
    if (!fields.lat) return true;
    if (!fields.global) return true;
    if (!fields.loop) return true;
    if (!fields.title) return true;
    if (!fields.text) return true;
    if (errMessages.length) return true;

    return false;
  };

  handleClearForm = e => {
    e.preventDefault();
    const { fields } = this.state;

    fields.lon = "";
    fields.lat = "";
    fields.global = "";
    fields.loop = "";
    fields.title = "";
    fields.text = "";

    this.setState({ fields });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { fields } = this.state;

    let width, height;
    if (fields.global === "continent") {
      width = 2048;
      height = 1024;
    } else {
      width = 1024;
      height = 512;
    }

    const formPayload = {
      id: Number(this.props.num) + 1,
      lon: fields.lon,
      lat: fields.lat,
      global: fields.global,
      loop: fields.loop,
      width: width,
      height: height,
      title: fields.title,
      text: fields.text
    };

    console.log(formPayload);
    client.postScene(formPayload);
    this.handleClearForm(e);
  };

  render() {
    return (
      <div
        className="container"
        style={{
          maxWidth: 600,
          color: "White",
          fontFamily: "Times New Roman"
        }}
      >

        <section className="row" style={{ textAlign: "center" }}>
          <div className="col-md-12">
            <h1>Add Scene CMS</h1>
            <hr />
          </div>
        </section>

        <form onSubmit={this.handleFormSubmit}>
          <div className="row">
            <div className="col-md-12">
              <SingleInput
                key={"lon"}
                inputType={"text"}
                title={"Longtitude"}
                name={"lon"}
                onChange={this.onInputChange}
                value={this.state.fields.lon}
                placeholder={""}
                validate={val => (val ? false : "Longtitude Required")}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <SingleInput
                key={"lat"}
                inputType={"text"}
                title={"Latitude"}
                name={"lat"}
                onChange={this.onInputChange}
                value={this.state.fields.lat}
                placeholder={""}
                validate={val => (val ? false : "Latitude Required")}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Select
                name={"global"}
                placeholder={"Choose Global"}
                onChange={this.onInputChange}
                options={this.state.globalOptions}
                value={this.state.fields.global}
                validate={val => (val ? false : " Global Selection Required")}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Select
                name={"loop"}
                placeholder={"Loop or not?"}
                onChange={this.onInputChange}
                options={this.state.loopOptions}
                value={this.state.fields.loop}
                validate={val => (val ? false : " Loop Selection Required")}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <SingleInput
                key={"title"}
                inputType={"text"}
                title={"Title for Description"}
                name={"title"}
                onChange={this.onInputChange}
                value={this.state.fields.title}
                placeholder={""}
                validate={val =>
                  val ? false : "Title for description Required"}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <TextArea
                title={"Details"}
                rows={5}
                value={this.state.fields.text}
                name={"text"}
                onChange={this.onInputChange}
                placeholder={""}
                validate={val => (val ? false : "Scene detail Required")}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12" style={{ textAlign: "center" }}>
              <input type="submit" value="Submit" disabled={this.validate()} />
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default Add;
