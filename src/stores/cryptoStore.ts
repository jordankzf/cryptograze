import { action, makeAutoObservable, observable } from "mobx";

class CryptoStore {
  refreshKey = 0;
  selectedCurrency = "USD";
  bitcoinPrice = 0;

  // {
  //   selectedCurrency: observable,
  //   setSelectedCurrency: action,
  //   triggerRefresh: action,
  //   updateBitcoinPrice: action
  // }
  constructor() {
    makeAutoObservable(this);
  }

  triggerRefresh = () => {
    this.refreshKey++;
  }

  setSelectedCurrency = (currency: string) => {
    this.selectedCurrency = currency;
    this.triggerRefresh();
  }

  updateBitcoinPrice = (price: number) => {
    this.bitcoinPrice = price;
  }
}

const cryptoStore = new CryptoStore();
export default cryptoStore;
