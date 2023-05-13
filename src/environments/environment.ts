interface env {
  adminController: string;
  authenticateController: string;
  userController: string;
  imgUrl: string;
}
export const environment: env = {
  adminController: 'https://localhost:7085/api/AdminBook',
  authenticateController: 'https://localhost:7085/api/Authentication',
  userController: 'https://localhost:7085/api/User',
  imgUrl: 'https://localhost:7085/img/',
};

