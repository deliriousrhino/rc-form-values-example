import React, { Component } from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;


const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        value: props.username.value,
      }),
      name: Form.createFormField({
        value: props.name.value,
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {

  const handleSubmit = (e) => {
        e.preventDefault();
        const {form, save} = props;
        form.validateFieldsAndScroll({force: true, scroll: {
          offsetTop: 40,
          onlyScrollIfNeeded: true
        }},(err, values) => {
          if (!err) {
           console.log('values',values)
          }
        });
      }    

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit} layout="inline">
      <FormItem label="Username">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <button>Submit</button>
    </Form>
  );
});

class FormDemo extends React.Component {
    state = {
      fields: {
        username: {value: 'benjycui'},
        name: {value: 'ryan'}
      },
    };
    handleFormChange = (changedFields) => {
      this.setState({
        fields: { ...this.state.fields, ...changedFields },
      });
    }
    render() {
      const fields = this.state.fields;
      return (
        <div>
          <CustomizedForm {...fields} onChange={this.handleFormChange} />
          <pre className="language-bash">
            {JSON.stringify(fields, null, 2)}
          </pre>
        </div>
      );
    }
  }

  export default FormDemo;