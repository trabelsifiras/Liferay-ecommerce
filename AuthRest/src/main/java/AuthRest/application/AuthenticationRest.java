package AuthRest.application;

import com.liferay.commerce.account.model.CommerceAccount;
import com.liferay.commerce.account.service.CommerceAccountLocalServiceUtil;
import com.liferay.commerce.model.CommerceAddress;
import com.liferay.commerce.service.CommerceAddressLocalServiceUtil;
import com.liferay.commerce.service.CommerceCountryLocalServiceUtil;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.Contact;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.security.auth.session.AuthenticatedSessionManagerUtil;
import com.liferay.portal.kernel.service.ContactLocalServiceUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.workflow.WorkflowConstants;

import java.util.Calendar;
import java.util.List;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.osgi.service.component.annotations.Reference;

@Path("/authentification")
public class AuthenticationRest {

    @Reference
    private UserLocalServiceUtil userLocalServiceUtil;

    @Reference
    private User user;

    @Reference
    private AuthenticatedSessionManagerUtil authenticatedSessionManagerUtil;

    @Reference
    private CommerceAccountLocalServiceUtil commerceAccountLocalServiceUtil;

    @Reference
    private ContactLocalServiceUtil contactLocalServiceUtil;

    @Reference
    private CommerceAddressLocalServiceUtil commerceAddressLocalServiceUtil;



    @Path("/signup")
    @POST
    @Produces("application/json")
    public String addUser(UserRest usr) throws PortalException {

        long[] groupIds = {37529} ;
        long[] organizationIds = null;
        long[] roleIds = null;
        long[] userGroupIds = null;
        boolean sendEmail = false;
        long creatorid = 37535;
        long companyid =37501;
        long a=0 ;
        long b=0 ;
        ServiceContext serviceContext = (ServiceContext) new ServiceContext();

        System.out.println(serviceContext.getUserId());

        User user = userLocalServiceUtil.addUserWithWorkflow(
                creatorid, companyid, false, usr.getPassword(), usr.getPassword(),
                true, usr.getScreenName(), usr.getEmail(), b, null, LocaleUtil.fromLanguageId("en_US"), usr.getFirstname(), " ",
                usr.getLastname(), a, b, usr.isSexe(), usr.getBirthmonth(), usr.getBirthday(),
                usr.getBirthyear(), usr.getJob_title(),groupIds, organizationIds, roleIds,
                userGroupIds, sendEmail,(ServiceContext) serviceContext.clone());

        user.setStatus(WorkflowConstants.STATUS_APPROVED);
        System.out.println(user.isSetupComplete());

        CommerceAccount commerceAccount = commerceAccountLocalServiceUtil.addPersonalCommerceAccount(user.getUserId(),null,null,
                serviceContext);

        return user.getFirstName();
    }

    @Path("/login")
    @POST
    @Produces("application/json")
    public UserRest login(LoginRest loginRest) throws Exception {
        long companyId = 37501;
        String loginIP = "127.0.0.1";
        String login = loginRest.getLogin();
        String password = loginRest.getPassword();




        if (existUser(login)) {
            try {
                long userId = userLocalServiceUtil.getUserIdByEmailAddress(companyId, login);
                User user = userLocalServiceUtil.getUser(userId);
                String pw = user.getPassword().substring(6);
                if (pw.equals(password)) {
                    userLocalServiceUtil.updateLastLogin(userId, loginIP);

                  /* authenticatedSessionManagerUtil.login();
                    long message = authenticatedSessionManagerUtil.getAuthenticatedUserId();
                    System.out.println(message);*/

                    Contact userContact = contactLocalServiceUtil.getContact(user.getContactId());
                    CommerceAddress userAddress = getUserAddress(userId);



                    UserRest userRest = new UserRest();
                    userRest.setFirstname(user.getFirstName());
                    userRest.setLastname(user.getLastName());
                    userRest.setEmail(user.getEmailAddress());
                    userRest.setBirthday(user.getBirthday().getDate());
                    userRest.setBirthmonth(user.getBirthday().getMonth());
                    userRest.setBirthyear(user.getBirthday().getYear());
                    userRest.setJob_title(user.getJobTitle());
                    userRest.setSexe(user.getMale());
                    userRest.setMobile(userContact.getSmsSn());
                    userRest.setAddress(userAddress.getStreet1());
                    userRest.setCity(userAddress.getCity());
                    userRest.setCountry(userAddress.getCommerceCountry().getName());
                    userRest.setFacebookSn(userContact.getFacebookSn());
                    userRest.setSkypeSn(userContact.getSkypeSn());
                    userRest.setTwitterSn(userContact.getTwitterSn());
                    userRest.setPoints("20");
                    userRest.setAuth(true);


                    System.out.println(userRest);
                    System.out.println(login);
                    System.out.println(password);
                    return userRest;

                }
                //incorrect password
                System.out.println("1");
                System.out.println(login);
                System.out.println(password);
                return new UserRest();
            } catch (ArithmeticException e) {
                //portal exception
                System.out.println("2");
                System.out.println(login);
                System.out.println(password);
                return new UserRest();
            }
        }
        //incorrect email
        System.out.println("3");
        System.out.println(login);
        System.out.println(password);
        return new UserRest();
    }

    private CommerceAddress getUserAddress(long userId) {
        List<CommerceAddress> userCommerceAddress = commerceAddressLocalServiceUtil.getCommerceAddresses(-1, -1);
        CommerceAddress commerceAddress = null;
        for (CommerceAddress address : userCommerceAddress
        ) {
            if (address.getUserId() == userId) {
                commerceAddress = address;
                break;
            }
        }
        return commerceAddress;
    }

    private boolean existUser(String login){
        List<User> users = userLocalServiceUtil.getUsers(-1, -1);
        boolean trouve = false;
        for (User user : users
        ) {
            if (user.getEmailAddress().equals(login)) {
                trouve = true;
                break;
            }
        }
        return trouve;
    }

}
