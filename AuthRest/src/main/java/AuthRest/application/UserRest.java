package AuthRest.application;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.User;

import java.util.Calendar;

public class UserRest {

	private long id;
	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private int birthday;
	private int birthmonth;
	private int birthyear;
	private String job_title;
	private boolean sexe;
	private String screenName;
	
	public String getScreenName() {
		return screenName;
	}
	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getBirthday() {
		return birthday;
	}
	public void setBirthday(int birthday) {
		this.birthday = birthday;
	}
	public int getBirthmonth() {
		return birthmonth;
	}
	public void setBirthmonth(int birthmonth) {
		this.birthmonth = birthmonth;
	}
	public int getBirthyear() {
		return birthyear;
	}
	public void setBirthyear(int birthyear) {
		this.birthyear = birthyear;
	}
	public String getJob_title() {
		return job_title;
	}
	public void setJob_title(String job_title) {
		this.job_title = job_title;
	}
	public boolean isSexe() {
		return sexe;
	}
	public void setSexe(boolean sexe) {
		this.sexe = sexe;
	}
	@Override
	public String toString() {
		return "UserRest [id=" + id + ", firstname=" + firstname + ", lastname=" + lastname + ", email=" + email
				+ ", password=" + password + ", birthday=" + birthday + ", birthmonth=" + birthmonth + ", birthyear="
				+ birthyear + ", job_title=" + job_title + ", sexe=" + sexe + "]";
	}
	public UserRest() {
		super();
	}
	
	public UserRest (User us) throws PortalException {
		id=us.getUserId();
		firstname=us.getFirstName();		
		lastname=us.getLastName();
		email=us.getEmailAddress();
		password=us.getPassword();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(us.getBirthday());
		birthday= calendar.get(Calendar.DAY_OF_MONTH);
		birthmonth=calendar.get(Calendar.MONTH);
		birthyear=calendar.get(Calendar.YEAR);
		job_title=us.getJobTitle();		
		sexe=us.getMale();
	}
}
