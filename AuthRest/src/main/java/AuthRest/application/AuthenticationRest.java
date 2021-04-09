package AuthRest.application;

import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.workflow.WorkflowConstants;

import java.util.List;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.osgi.service.component.annotations.Reference;

@Path("/testrest")
public class AuthenticationRest {
	@Reference
	private UserLocalServiceUtil userutil;
	
	@Path("/postuser")
	@POST
	@Produces("application/json")
	public String addUser(UserRest usr) throws PortalException {
	
		long[] groupIds = {37729} ;
		
		long[] organizationIds = null;
		long[] roleIds = null;
		long[] userGroupIds = null;
		boolean sendEmail = false;
		long compayid =37701;
		long a=0 ;
		long b=0 ;
	
	ServiceContext serviceContext = (ServiceContext) new ServiceContext();
	
 System.out.println(serviceContext.getUserId());
//	User user =userk.addUserWithWorkflow (37701, false, usr.getPassword(), usr.getPassword(), true, usr.getScreenName(), usr.getEmail(),
//			                             null, null, null, usr.getFirstname(), null, usr.getLastname(), null, null, usr.isSexe(), usr.getBirthmonth(), 
//			                             usr.getBirthday(), usr.getBirthyear(), usr.getJob_title(), null, null, 37714, 
//			                            null, false, null);
		
		User user = userutil.addUserWithWorkflow(
				37735, compayid, false, usr.getPassword(), usr.getPassword(),
				true, usr.getScreenName(), usr.getEmail(), b, null, LocaleUtil.fromLanguageId("en_US"), usr.getFirstname(), " ",
				usr.getLastname(), a, b, usr.isSexe(), usr.getBirthmonth(), usr.getBirthday(),
				usr.getBirthyear(), usr.getJob_title(),groupIds, organizationIds, roleIds,
				userGroupIds, sendEmail,(ServiceContext) serviceContext.clone());
		user.setStatus(WorkflowConstants.STATUS_APPROVED);
	//
		System.out.println(user.isSetupComplete());
	
		
		 User pass =userutil.getUser(37735);
		 System.out.println(pass.isSetupComplete());
		 System.out.println(pass.getPassword());
		return user.getFirstName();
	}
	
	@POST
    @Produces("application/json")
    public boolean login(LoginRest loginRest) throws Exception {
        long companyId = 37510;
        String login = loginRest.getLogin();
        String password = loginRest.getPassword();

        List<User> users = userutil.getUsers(-1, -1);
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
                long userId = userutil.getUserIdByEmailAddress(companyId, login);
                User user = userutil.getUser(userId);
                String pw = user.getPassword().substring(6);
                return pw.equals(password);


            } catch (Exception e) {
                return false;

            }

        }
        return false;
    }

}
