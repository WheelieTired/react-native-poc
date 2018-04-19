import React from 'react';
import { View, Text } from 'react-native';
import t from 'tcomb-form-native';
import Checkbox from 'react-native-checkbox';
import _ from 'lodash';

class TcombMultiSelect extends t.form.Select {
  constructor(props) {
    super(props);
    const locals = super.getLocals();
    const isChecked = {};
    const { options, value } = locals;
 
   options &&
      options.map(item => (isChecked[item.text] = !!_.find(value, _value => _value === item.text)));

    this.state = {
      isChecked,
    };
  }

  getTransformer() {
    return TcombMultiSelect.transformer();
  }

  getTemplate() {
    return (locals) => {
      const stylesheet = locals.stylesheet;
      let formGroupStyle = stylesheet.formGroup.normal;
      let controlLabelStyle = stylesheet.controlLabel.normal;
      let checkboxStyle = stylesheet.checkbox.normal;
      let helpBlockStyle = stylesheet.helpBlock.normal;
      const errorBlockStyle = stylesheet.errorBlock;

      if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        controlLabelStyle = stylesheet.controlLabel.error;
        checkboxStyle = stylesheet.checkbox.error;
        helpBlockStyle = stylesheet.helpBlock.error;
      }

      const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
      const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
      const error =
        locals.hasError && locals.error ? (
          <Text style={errorBlockStyle}>{locals.error}</Text>
        ) : null;

      const viewArr = [];

      locals.options.map((item, index) =>
        viewArr.push(<Checkbox
            key={index}
            ref={item.text}
            label={item.text}
            checked={this.state.isChecked[item.text]}
            onChange={(checked) => {
              this._onChange(item, locals, !checked);
            }}
          />, ), );

      return (
        <View style={formGroupStyle}>
          {label}
          {viewArr}
          {help}
          {error}
        </View>
      );
    };
  }

  getOptions() {
    const { options } = this.props;
    const items = options.options ? options.options.slice() : this.getOptionsOfEnum(this.getEnum());
    if (options.order) {
      items.sort(this.getComparator(options.order));
    }
    return items;
  }


  _onChange(item, locals, checked) {
    const { isChecked } = this.state;
    isChecked[item.text] = checked;
    const changeArr = [];

    this. _onChange = this. _onChange.bind(this);

    _.forIn(isChecked, (isCheckedItem, key) => {
      isCheckedItem && changeArr.push(key);
    });

    locals.onChange(changeArr);

    this.setState({
      isChecked,
    });
  }
}

TcombMultiSelect.transformer = () => ({
  format: value => (Array.isArray(value) ? value : []),
  parse: value => value || [],
});

export default TcombMultiSelect;