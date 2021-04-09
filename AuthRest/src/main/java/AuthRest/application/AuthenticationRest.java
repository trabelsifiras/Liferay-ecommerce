package AuthRest.application;

import com.liferay.commerce.account.model.CommerceAccount;
import com.liferay.commerce.account.service.CommerceAccountLocalServiceUtil;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.security.auth.session.AuthenticatedSessionManagerUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.workflow.WorkflowConstants;

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
    public boolean login(LoginRest loginRest) throws Exception {
        long companyId = 37501;
        String loginIP = "127.0.0.1";
        String login = loginRest.getLogin();
        String password = loginRest.getPassword();

        List<User> users = userLocalServiceUtil.getUsers(-1, -1);
        boolean trouve = false;
        for (User user : users
        ) {
            if (user.getEmailAddress().equals(login)) {
                trouve = true;
                break;
            }
        }
        if (trouve) {
            try {
                long userId = userLocalServiceUtil.getUserIdByEmailAddress(companyId, login);
                User user = userLocalServiceUtil.getUser(userId);
                String pw = user.getPassword().substring(6);
                if (pw.equals(password)) {
                    userLocalServiceUtil.updateLastLogin(userId, loginIP);
                   /* authenticatedSessionManagerUtil.login();
                    long message = authenticatedSessionManagerUtil.getAuthenticatedUserId();
                    System.out.println(message);*/
                    return true;
                }
                return false;
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }

}
