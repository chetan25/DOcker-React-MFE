declare module "home/HomeApp" { 
    const mountHomeApp: (el: HTMLElement, options: {}) => {
      onContainerNavigate: any
    }; 
   
    export { mountHomeApp }; 
}