import { WarehouseProvider } from '../context/WarehouseContext'; // replace './WarehouseContext' with the actual path to the WarehouseContext file
import Mainwarehouse from './Mainwarehouse'; // replace './Mainwarehouse' with the actual path to the Mainwarehouse file



function Main() {
    return (
        <WarehouseProvider>

            <Mainwarehouse />

        </WarehouseProvider>
    );
}

export default  Main;