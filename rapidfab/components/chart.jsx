import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChartJS from 'chart.js';
import { injectIntl } from 'react-intl';

export const SeriesStyle = {
  Warning: { color: '#e4d836', hover: '#ccbf1b' },
  Info: { color: '#9f86ff', hover: '#7753ff' },
  Danger: { color: '#e64759', hover: '#dc1e33' },
  Success: { color: '#1bc98e', hover: '#159c6e' },
  Default: { color: '#ffffff', hover: '#e6e6e6' },
  Primary: { color: '#1ca8dd', hover: '#1686b0' },
};

export const SeriesStyles = _.toArray(SeriesStyle);

ChartJS.defaults.global.defaultFontColor = '#fff';
ChartJS.defaults.global.defaultFontFamily =
  'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif';

function formatLabel(intl, label) {
  if (typeof label !== 'object') return label;
  return intl.formatMessage(label.props ? label.props : label);
}

function formatLabels(intl, labels) {
  return _.map(labels, label => formatLabel(intl, label));
}

class Chart extends Component {
  componentDidMount() {
    const datasets = _.map(this.props.data.datasets, (dataset, index) => {
      const style = SeriesStyles[index];
      return _.assign(
        {
          borderColor: style.color,
          hoverBorderColor: style.hover,
          backgroundColor: style.color,
          hoverBackgroundColor: style.hover,
          pointHoverColor: style.hover,
          pointBackgroundColor: style.color,
          borderWidth: this.props.type === 'line' ? 2 : 0,
          fill: false,
        },
        dataset
      );
    });
    /* eslint-disable react/no-string-refs */
    const chart = new ChartJS(this.refs.chart, {
      type: this.props.type,
      data: _.assign({}, this.props.data, {
        labels: formatLabels(this.props.intl, this.props.data.labels),
        datasets,
      }),
      options: _.merge(
        {
          hover: { mode: 'single' },
          legend: { display: false },
          scales: {
            yAxes: [
              {
                ticks: { min: 0 },
              },
            ],
          },
        },
        this.props.options
      ),
    });
    /* eslint-enable react/no-string-refs */
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ chart });
    /* eslint-enable react/no-did-mount-set-state */
  }

  componentDidUpdate() {
    const chart = this.state.chart;
    const data = this.props.data;
    for (
      let index = 0;
      index < data.datasets.length && index < chart.data.datasets.length;
      index += 1
    ) {
      chart.data.datasets[index].data = data.datasets[index].data;
    }
    chart.data.labels = formatLabels(this.props.intl, data.labels);
    chart.update();
  }

  render() {
    /* eslint-disable react/no-string-refs */
    return <canvas ref="chart" height="300" width="600" />;
    /* eslint-disable react/no-string-refs */
  }
}

Chart.propTypes = {
  data: PropTypes.shape({
    datasets: PropTypes.arrayOf(PropTypes.object),
    labels: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  intl: PropTypes.shape({}).isRequired,
  options: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
};

export default injectIntl(Chart);
