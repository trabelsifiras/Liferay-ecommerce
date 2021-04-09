package AuthRest.application;


import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class LoginRest {

    private String login;
    private String password;

    public LoginRest() {
        super();
    }
    public LoginRest(String login, String password) {
        super();
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }
    public void setLogin(String login) {
        this.login = login;
    }
    public String getPassword () {
        return password ;
    }
    public void setPassword (String password ) {
        this.password  = password ;
    }


    @Override
    public String toString() {
        return "LoginRest [login=" + login + ", password=" + password + "]";
    }

}
