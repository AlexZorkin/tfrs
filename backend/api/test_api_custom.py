"""
    REST API Documentation for the NRS TFRS Credit Trading Application

    The Transportation Fuels Reporting System is being designed to streamline compliance reporting for transportation fuel suppliers in accordance with the Renewable & Low Carbon Fuel Requirements Regulation.

    OpenAPI spec version: v1
        

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
"""

import json
from django.test import TestCase
from django.test import Client
from django.core.files.uploadedfile import SimpleUploadedFile
import django

from rest_framework.test import APIRequestFactory
from rest_framework.parsers import JSONParser
from rest_framework import status

from . import fakedata
from .models.Audit import Audit
from .serializers import AuditSerializer
from .models.CreditTrade import CreditTrade
from .serializers import CreditTradeSerializer
from .models.CreditTradeHistory import CreditTradeHistory
from .serializers import CreditTradeHistorySerializer
from .models.CreditTradeStatus import CreditTradeStatus
from .serializers import CreditTradeStatusSerializer
from .models.CreditTradeType import CreditTradeType
from .serializers import CreditTradeTypeSerializer
from .models.CreditTradeZeroReason import CreditTradeZeroReason
from .serializers import CreditTradeZeroReasonSerializer
from .models.CurrentUserViewModel import CurrentUserViewModel
from .serializers import CurrentUserViewModelSerializer
from .models.FuelSupplier import FuelSupplier
from .serializers import FuelSupplierSerializer
from .models.FuelSupplierActionsType import FuelSupplierActionsType
from .serializers import FuelSupplierActionsTypeSerializer
from .models.FuelSupplierAttachment import FuelSupplierAttachment
from .serializers import FuelSupplierAttachmentSerializer
from .models.FuelSupplierBalance import FuelSupplierBalance
from .serializers import FuelSupplierBalanceSerializer
from .models.FuelSupplierHistory import FuelSupplierHistory
from .serializers import FuelSupplierHistorySerializer
from .models.FuelSupplierStatus import FuelSupplierStatus
from .serializers import FuelSupplierStatusSerializer
from .models.Permission import Permission
from .serializers import PermissionSerializer
from .models.PermissionViewModel import PermissionViewModel
from .serializers import PermissionViewModelSerializer
from .models.Role import Role
from .serializers import RoleSerializer
from .models.RolePermission import RolePermission
from .serializers import RolePermissionSerializer
from .models.RolePermissionViewModel import RolePermissionViewModel
from .serializers import RolePermissionViewModelSerializer
from .models.RoleViewModel import RoleViewModel
from .serializers import RoleViewModelSerializer
from .models.User import User
from .serializers import UserSerializer
from .models.UserDetailsViewModel import UserDetailsViewModel
from .serializers import UserDetailsViewModelSerializer
from .models.UserRole import UserRole
from .serializers import UserRoleSerializer
from .models.UserRoleViewModel import UserRoleViewModel
from .serializers import UserRoleViewModelSerializer
from .models.UserViewModel import UserViewModel
from .serializers import UserViewModelSerializer


# Custom API test cases. 
# If an API operation does not contains generated code then it is tested in this 
# file.
#
class Test_Api_Custom(TestCase):

    def setUp(self):
        # Every test needs a client.
        self.client = Client()
        # needed to setup django
        django.setup()

    def createFuelSupplierStatus(self):
        testUrl = "/api/fuelsupplierstatuses"
        payload = fakedata.FuelSupplierStatusTestDataCreate()
        payload['effective_date'] = '2017-01-01'
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_201_CREATED == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']
        return createdId

    def createFuelSupplierActionType(self):
        testUrl = "/api/fuelsupplieractionstypes"
        payload = fakedata.FuelSupplierActionsTypeTestDataCreate()
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_201_CREATED == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']
        return createdId

    def createFuelSupplier(self):
        statusId = self.createFuelSupplierStatus()
        actionsTypeId = self.createFuelSupplierActionType()

        testUrl = "/api/fuelsuppliers"
        # Create:
        payload = {
          'name': "Initial",
          'status': "Initial",
          'createdDate': '2000-01-01',
        #   'primaryContact': contactId ,
        #   'contacts': [contactId],
          'notes': [],
          'attachments': [],
          'history': [],
          'fuelSupplierStatusFK': statusId,
          'fuelSupplierActionsTypeFK': actionsTypeId,
        }
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_201_CREATED == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']
        return createdId, statusId, actionsTypeId

    def createRole(self):
        testUrl = "/api/roles"
        # Create:
        fakeRole = fakedata.RoleTestDataCreate()
        payload = {
          'name': fakeRole['name'],
          'description': fakeRole['description']
        }
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_201_CREATED == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']
        return createdId

    def createPermission(self):
        testUrl = "/api/permissions"
        # Create:
        fakePermission = fakedata.PermissionTestDataCreate()
        payload = {
          'code': fakePermission['code'],
          'name': fakePermission['name'],
          'description': fakePermission['description']
        }
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_201_CREATED == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']
        return createdId

    def createUser(self, fuelsupplierId):
        testUserUrl = "/api/users"
        # Create:
        fakeUser = fakedata.UserTestDataCreate()
        payload = {
          'givenName': fakeUser['givenName'],
          'surname':fakeUser['surname'],
          'email':fakeUser['email'],
          'status':'Active',
          'userFK':fakeUser['userId'],
          'guid':fakeUser['guid'],
          'authorizationDirectory':fakeUser['authorizationDirectory'],
          'fuelSupplier': fuelsupplierId
        }
        jsonString = json.dumps(payload)
        response = self.client.post(testUserUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_201_CREATED == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        userId = data['id']
        return userId

    def createCreditTradeType(self):
        testUrl = "/api/credittradetypes"
        payload = fakedata.CreditTradeTypeTestDataCreate()
        payload['expiration_date'] = '2017-01-02'
        payload['effective_date'] = '2017-01-01'
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_201_CREATED == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']
        return createdId

    def createCreditTradeStatus(self):
        testUrl = "/api/credittradestatuses"
        payload = fakedata.CreditTradeStatusTestDataCreate()
        payload['effective_date'] = '2017-01-01'
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_201_CREATED == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']
        return createdId

    def createCreditTrade(self, fuelSupplierId, userId):
        typeId = self.createCreditTradeType()
        statusId = self.createCreditTradeStatus()

        testUrl = "/api/credittrades"
        payload = {
          'status':'Active',
          'initiator':fuelSupplierId,
          'respondent': fuelSupplierId,
          'initiatorLastUpdateBy': userId,
          'respondentLastUpdatedBy': None,
          'reviewedRejectedBy': None,
          'approvedRejectedBy': None,
          'cancelledBy': None,
          'tradeExecutionDate': '2017-01-01',
        #   TODO: replace transactionType
          'transactionType':'Type',
          'fairMarketValuePrice': '100.00',
          'fuelSupplierBalanceBeforeTransaction':'2017-01-01',
          'notes':[],
          'attachments':[],
          'history':[],
          'creditTradeTypeFK': typeId,
          'creditTradeStatusFK': statusId,
          'respondentFK': fuelSupplierId,
        }
        fakeCreditTrade = fakedata.CreditTradeTestDataCreate()
        payload.update(fakeCreditTrade)
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_201_CREATED == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']
        return createdId, typeId, statusId

        return createdId

    def deleteRole(self, roleId):
        deleteUrl = "/api/roles/" + str(roleId) + "/delete"
        response = self.client.post(deleteUrl)
        # Check that the response is OK.
        assert status.HTTP_204_NO_CONTENT == response.status_code

    def deleteUser(self, userId):
        deleteUrl = "/api/users/" + str(userId) + "/delete"
        response = self.client.post(deleteUrl)
        # Check that the response is OK
        assert status.HTTP_204_NO_CONTENT == response.status_code

    def deleteFuelSupplier(self, fuelsupplierId):
        deleteUrl = "/api/fuelsuppliers/" + str(fuelsupplierId) + "/delete"
        response = self.client.post(deleteUrl)
        # Check that the response is OK.
        assert status.HTTP_204_NO_CONTENT == response.status_code

    def deleteCreditTrade(self, creditTradeId):
        deleteUrl = "/api/credittrades/" + str(creditTradeId) + "/delete"
        response = self.client.post(deleteUrl)
        # Check that the response is OK.
        assert status.HTTP_204_NO_CONTENT == response.status_code

    def deletePermission(self, permissionId):
        deleteUrl = "/api/permissions/" + str(permissionId) + "/delete"
        response = self.client.post(deleteUrl)
        # Check that the response is OK.
        assert status.HTTP_204_NO_CONTENT == response.status_code

    def test_credittradesSearchGet(self):
        fsId, _, _ = self.createFuelSupplier()
        userId = self.createUser(fsId)
        credId, credTypeId, _ = self.createCreditTrade(fsId, userId)

        testUrl = "/api/credittrades/search"
        response = self.client.get(testUrl)
        assert status.HTTP_200_OK == response.status_code

        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        assert len(data) == 1

        self.deleteCreditTrade(credId)
        self.deleteUser(userId)
        self.deleteFuelSupplier(fsId)

    def test_usersCurrentGet(self):
        fuelSupplierId, statusId, actionId = self.createFuelSupplier()
        userId = self.createUser(fuelSupplierId)

        testUrl="/api/users/current"
        # List:
        response = self.client.get(testUrl)
        assert status.HTTP_200_OK == response.status_code
        self.deleteUser (userId)
        self.deleteFuelSupplier(fuelSupplierId)

    def test_fuelsuppliersIdAttachmentsGet(self):
        fuelSupplierId, statusId, actionId = self.createFuelSupplier()

        uploadUrl = "/api/fuelsuppliers/"
        uploadUrl += str(fuelSupplierId) + "/attachments"
        payload = fakedata.FuelSupplierAttachmentTestDataCreate()
        payload['fuelSupplierFK'] = fuelSupplierId
        rawData = "TEST"
        jsonString = json.dumps(payload)
        fileData = SimpleUploadedFile("file.txt", rawData.encode('utf-8') )
        form = {
            "file": fileData,
            "item": jsonString,
        }
        response = self.client.post(uploadUrl, data=form)
        # Check that the response is OK.
        assert status.HTTP_200_OK == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']

        testUrl = "/api/fuelsupplierattachments"
        # download the attachment.
        downloadUrl = testUrl + "/" + str(createdId)
        response = self.client.get(downloadUrl)
        # Check that the response is 200 OK.
        result = response.content.decode("utf-8")
        assert status.HTTP_200_OK == response.status_code
        parsed = response.content.decode("utf-8")

        # response should match the contents sent.
        # TODO: check that raw data matched returned parsed data
        # assert rawData==parsed

        # Cleanup:
        deleteUrl = "/api/fuelsupplierattachments/" + str(createdId) + "/delete"
        response = self.client.post(deleteUrl)
        # Check that the response is OK.
        assert status.HTTP_204_NO_CONTENT == response.status_code

        # Cleanup
        self.deleteFuelSupplier(fuelSupplierId)

    def test_fuelsuppliersIdHistoryGet(self):
        fuelSupplierId, statusId, actionId = self.createFuelSupplier()

        testUrl = "/api/fuelsuppliers/" + str(fuelSupplierId) + "/history"
        payload = fakedata.FuelSupplierHistoryTestDataCreate()
        payload['fuelSupplierFK'] = fuelSupplierId
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_200_OK == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        createdId = data['id']

        # Cleanup the History
        deleteUrl = "/api/fuelsupplierhistories/" + str(createdId) + "/delete"
        response = self.client.post(deleteUrl)
        # Check that the response is OK.
        assert status.HTTP_204_NO_CONTENT == response.status_code

        # Cleanup
        self.deleteFuelSupplier(fuelSupplierId)

    def test_fuelsuppliersSearchGet(self):
        fuelSupplierId, statusId, actionId = self.createFuelSupplier()

        # do a search
        testUrl = "/api/fuelsuppliers/search"
        response = self.client.get(testUrl)
        # Check that the response is OK.
        assert status.HTTP_200_OK == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        # Cleanup
    def test_rolesIdPermissionsGet(self):
        # create a group.
        roleId = self.createRole()
        # create a permission.
        permissionId = self.createPermission()

        rolePermissionUrl = "/api/roles/" + str(roleId) + "/permissions"
        # create a new group membership.
        payload = {'roleFK':roleId, 'permissionFK':permissionId}
        jsonString = json.dumps(payload)
        response = self.client.post(rolePermissionUrl,content_type='application/json', data=jsonString)
        assert status.HTTP_200_OK == response.status_code
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        rolePermissionId = data['id']

        # test the get
        response = self.client.get(rolePermissionUrl)
        assert status.HTTP_200_OK == response.status_code

        # test the put.  This will also delete the RolePermission.
        payload = []
        jsonString = json.dumps(payload)
        response = self.client.put(rolePermissionUrl,content_type='application/json', data=jsonString)
        assert status.HTTP_200_OK == response.status_code

        # cleanup

        self.deleteRole(roleId)
        self.deletePermission(permissionId)

    def test_rolesIdUsersGet(self):
        roleId = self.createRole()
        fuelSupplierId, statusId, actionId = self.createFuelSupplier()
        userId = self.createUser(fuelSupplierId)

        userRoleUrl = "/api/users/" + str(userId) + "/roles"
        # create a new UserRole.
        payload = {
            'effective_date': '2000-01-01',
            'expiration_date': None,
            'user': userId,
            'role': roleId
        }
        jsonString = json.dumps(payload)
        response = self.client.post(userRoleUrl,content_type='application/json', data=jsonString)
        assert status.HTTP_200_OK == response.status_code

        # test the get
        response = self.client.get(userRoleUrl)
        assert status.HTTP_200_OK == response.status_code

        testUrl = "/api/roles/" + str(roleId)
        # get the users in the group.
        response = self.client.get(testUrl)
        # Check that the response is OK.
        assert status.HTTP_200_OK == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)

        # test the PUT - this will clear the user role map.
        payload = []
        jsonString = json.dumps(payload)
        response = self.client.put(userRoleUrl,content_type='application/json', data=jsonString)
        assert status.HTTP_200_OK == response.status_code

        # cleanup
        self.deleteRole(roleId)
        self.deleteUser(userId)
        self.deleteFuelSupplier(fuelSupplierId)
    def test_usersIdPermissionsGet(self):
        # create a user.
        fuelSupplierId, statusId, actionId = self.createFuelSupplier()
        userId = self.createUser(fuelSupplierId)

        # create a credit trade

        notificationEventId = self.createUser(fuelSupplierId)

        # assign permissions to the user.
        #TODO add that.

        userPermissionUrl = "/api/users/" + str(userId) + "/permissions"

        # test the Get
        response = self.client.get(userPermissionUrl)
        assert status.HTTP_200_OK == response.status_code

        # cleanup
        self.deleteUser (userId)
        self.deleteFuelSupplier(fuelSupplierId)

    def test_usersIdRolesGet(self):
        fsId, _, _= self.createFuelSupplier()
        userId = self.createUser(fsId)
        roleId = self.createRole()

        url = "/api/users/" + str(userId) + "/roles"
        payload = fakedata.UserRoleTestDataCreate()
        payload['user'] = userId
        payload['role'] = roleId
        jsonString = json.dumps(payload)
        response = self.client.post(url, content_type='application/json', data=jsonString)

        assert response.status_code == status.HTTP_200_OK

        response = self.client.get(url)

        assert response.status_code == status.HTTP_200_OK

        payload = [fakedata.UserRoleTestDataUpdate()]
        payload[0]['user'] = userId
        payload[0]['role'] = roleId
        jsonString = json.dumps(payload)
        response = self.client.put(url, content_type='application/json', data=jsonString)

        assert response.status_code == status.HTTP_200_OK

        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)

        assert data[0]['userFK'] == userId
        assert data[0]['roleFK'] == roleId

        self.deleteRole(roleId)
        self.deleteUser(userId)
        self.deleteFuelSupplier(fsId)

    def test_usersSearchGet(self):
        fuelSupplierId, statusId, actionId = self.createFuelSupplier()
        userId = self.createUser(fuelSupplierId)

        # do a search
        testUrl = "/api/users/search"
        response = self.client.get(testUrl)
        # Check that the response is OK.
        assert status.HTTP_200_OK == response.status_code
        # parse the response.
        jsonString = response.content.decode("utf-8")
        data = json.loads(jsonString)
        # Cleanup
        self.deleteUser(userId)
        self.deleteFuelSupplier(fuelSupplierId)

    def test_createCreditTradeNegativeNumberOfCredits(self):
        fsId, _, _ = self.createFuelSupplier()
        userId = self.createUser(fsId)
        typeId = self.createCreditTradeType()
        statusId = self.createCreditTradeStatus()

        testUrl = "/api/credittrades"
        payload = {
          'creditTradeStatusFK': statusId,
          'creditTradeTypeFK': typeId,
          'fairMarketValuePrice': '100.00',
          'historySet':[],
          'initiator': fsId,
          'respondentFK': fsId,
          'trade_effective_date': '2017-01-01',
        }
        fakeCreditTrade = fakedata.CreditTradeTestDataCreate()
        payload.update(fakeCreditTrade)
        payload['numberOfCredits'] = -1
        jsonString = json.dumps(payload)
        response = self.client.post(testUrl, content_type='application/json', data=jsonString)
        # Check that the response is OK.
        assert status.HTTP_422_UNPROCESSABLE_ENTITY == response.status_code

        self.deleteUser(userId)
        self.deleteFuelSupplier(fsId)

if __name__ == '__main__':
    unittest.main()




