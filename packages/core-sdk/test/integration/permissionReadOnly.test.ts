import { expect } from "chai";
import {
  StoryClient,
  StoryReadOnlyConfig,
  ReadOnlyClient,
  ListTransactionRequest,
  ResourceType,
  Transaction,
} from "../../src";
import { ListPermissionsRequest, Permission } from "../../src/types/resources/permission";

describe("Permission client integration tests", function () {
  let client: ReadOnlyClient;

  before(async function () {
    const config: StoryReadOnlyConfig = {};
    client = StoryClient.newReadOnlyClient(config);
  });

  describe("List Permissions", async function () {
    it("should return array of permissions", async function () {
      const req = {
        options: {
          limit: 10,
          offset: 0,
        },
      } as ListPermissionsRequest;

      const response = await client.permission.list(req);
      expect(response).to.have.property("data");
      expect(response.data).to.be.an("array");
      expect(response.data.length).to.gt(0);
      expectPermissionFields(response.data[0]);
    });

    it("should return a list of permissions successfully without options", async function () {
      const response = await client.permission.list();

      expect(response).to.have.property("data");
      expect(response.data).to.be.an("array");
      expect(response.data.length).to.gt(0);
      expectPermissionFields(response.data[0]);
    });

    it("should return a list of permissions if the options are invalid", async function () {
      const options = {
        options: {},
      } as ListPermissionsRequest;
      const response = await client.permission.list(options);

      expect(response).to.have.property("data");
      expect(response.data).to.be.an("array");
      expect(response.data.length).to.gt(0);
      expectPermissionFields(response.data[0]);
    });
  });

  describe("Get Permission", async function () {
    it("should return permission from request permission id", async function () {
      const response = await client.permission.get({
        permissionId:
          (process.env.TEST_PERMISSION_ID as string) ||
          "0x06cb17d43f16ad5cc3cd7757296fa87ce7ac741d-0x6c88f438cbfd9866dcd067ffe18b951f19b968da-0x0baa92f82d8992ff152047f29084079c263be7f7-0xa2b4192f",
      });

      expect(response).to.have.property("data");
      expectPermissionFields(response.data);
    });
  });

  function expectPermissionFields(permission: Permission) {
    expect(permission).to.have.property("id");
    expect(permission).to.have.property("ipAccount");
    expect(permission).to.have.property("permission");
    expect(permission).to.have.property("signer");
    expect(permission).to.have.property("to");
    expect(permission).to.have.property("func");
    expect(permission).to.have.property("blockTimestamp");
    expect(permission).to.have.property("blockNumber");
  }
});