import Home from 'rapidfab/containers/home';
import AdminContainer from 'rapidfab/containers/admin/AdminContainer';
import About from 'rapidfab/components/about';
import BureauError from 'rapidfab/components/bureauError';

import InventoryLocations from 'rapidfab/containers/inventory/locations';
import InventoryManufacturers from 'rapidfab/containers/inventory/manufacturers';
import InventoryConversions from 'rapidfab/containers/inventory/conversions';
import InventoryShipping from 'rapidfab/containers/inventory/shipping';
import InventoryTemplates from 'rapidfab/containers/inventory/templates';
import InventoryMaterials from 'rapidfab/containers/inventory/materials';
import InventoryStocks from 'rapidfab/containers/inventory/stocks';
import InventoryPostProcessors from 'rapidfab/containers/inventory/postProcessors';
import InventoryPostProcessorTypes from 'rapidfab/containers/inventory/postProcessorTypes';
import InventoryThirdPartyProviders from 'rapidfab/containers/inventory/thirdPartyProviders';
import InventoryPrinters from 'rapidfab/containers/inventory/printers';
import InventoryPrinterTypes from 'rapidfab/containers/inventory/printerTypes';

import Orders from 'rapidfab/containers/plan/orders';
import Runs from 'rapidfab/containers/plan/runs';
import Prints from 'rapidfab/containers/plan/prints';

import QueuesContainer from 'rapidfab/containers/work/QueuesContainer';

import OrderEdit from 'rapidfab/containers/records/order/edit';
import OrderNew from 'rapidfab/containers/records/order/new';

import Location from 'rapidfab/containers/records/location';
import ThirdPartyProviderContainer from 'rapidfab/containers/records/ThirdPartyProviderContainer';
import Manufacturer from 'rapidfab/containers/records/manufacturer';
import conversion from 'rapidfab/containers/records/conversion';
import ShippingContainer from 'rapidfab/containers/records/ShippingContainer';
import Material from 'rapidfab/containers/records/material';
import Print from 'rapidfab/containers/records/print';
import PrinterContainer from 'rapidfab/containers/records/PrinterContainer';
import PrinterType from 'rapidfab/containers/records/printerType';
import PostProcessorFormContainer from 'rapidfab/containers/records/PostProcessorFormContainer';
import PostProcessorType from 'rapidfab/containers/records/postProcessorType';
import StockContainer from 'rapidfab/containers/records/StockContainer';
import TemplateContainer from 'rapidfab/containers/records/TemplateContainer';
import RunRecordContainer from 'rapidfab/containers/records/run/RunRecordContainer';
import RunNewContainer from 'rapidfab/containers/records/run/RunNewContainer';

import Styles from 'rapidfab/containers/styles';

const Routes = {
  '/': Home,
  '/about': About,
  '/admin': AdminContainer,
  '/bureau-error': BureauError,
  '/styles': Styles,

  '/inventory/materials': InventoryMaterials,
  '/inventory/stocks': InventoryStocks,
  '/inventory/locations': InventoryLocations,
  '/inventory/manufacturers': InventoryManufacturers,
  '/inventory/shipping': InventoryShipping,
  '/inventory/templates': InventoryTemplates,
  '/inventory/conversions': InventoryConversions,
  '/inventory/post-processors': InventoryPostProcessors,
  '/inventory/post-processor-types': InventoryPostProcessorTypes,
  '/inventory/third-party-providers': InventoryThirdPartyProviders,
  '/inventory/printers': InventoryPrinters,
  '/inventory/printer-types': InventoryPrinterTypes,

  '/plan/orders': Orders,
  '/plan/runs': Runs,
  '/plan/prints': Prints,

  '/work/queues': QueuesContainer,

  '/records/order': OrderNew,
  '/records/order/:uuid': OrderEdit,
  '/records/location': Location,
  '/records/location/:uuid': Location,
  '/records/third-party-provider': ThirdPartyProviderContainer,
  '/records/third-party-provider/:uuid': ThirdPartyProviderContainer,
  '/records/manufacturer': Manufacturer,
  '/records/manufacturer/:uuid': Manufacturer,
  '/records/shipping': ShippingContainer,
  '/records/shipping/:uuid': ShippingContainer,
  '/records/conversion': conversion,
  '/records/conversion/:uuid': conversion,
  '/records/material': Material,
  '/records/material/:uuid': Material,
  '/records/print/:uuid': Print,
  '/records/printer': PrinterContainer,
  '/records/printer/:uuid': PrinterContainer,
  '/records/printer-type': PrinterType,
  '/records/printer-type/:uuid': PrinterType,
  '/records/post-processor': PostProcessorFormContainer,
  '/records/post-processor/:uuid': PostProcessorFormContainer,
  '/records/post-processor-type': PostProcessorType,
  '/records/post-processor-type/:uuid': PostProcessorType,
  '/records/stock': StockContainer,
  '/records/stock/:uuid': StockContainer,
  '/records/run': RunNewContainer,
  '/records/run/:uuid': RunRecordContainer,
  '/records/template/': TemplateContainer,
  '/records/template/:uuid': TemplateContainer,
};

export default Routes;
